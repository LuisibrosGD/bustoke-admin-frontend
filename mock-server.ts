// ============================================================
// MOCK API SERVER - BUSTOKE ADMIN PANEL

interface ApiRequest extends http.IncomingMessage {
  params: Record<string, string>;
  query: Record<string, string>;
}
// Fuente de verdad: src/infrastructure/mock/data.ts
// Tipos canónicos: src/infrastructure/domain/types.ts
//
// Ejecutar: npm run mock-server  (usa tsx)
//   ó:      npx tsx mock-server.ts
//
// El frontend apunta a http://localhost:5000 via NEXT_PUBLIC_URL_API.
// Next.js rewrites /api/* -> localhost:5000/* (el server maneja ambos prefijos).
// ============================================================

import http from 'http';
import url from 'url';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import {
  MOCK_TERMINALES,
  MOCK_AGENCIAS,
  MOCK_BUSES,
  MOCK_RUTAS,
  MOCK_VIAJES,
  MOCK_SUSCRIPCIONES,
  MOCK_TICKETS_SOPORTE,
  MOCK_RECLAMOS,
  MOCK_USUARIOS,
  MOCK_LIQUIDACIONES,
  MOCK_API_KEYS,
  MOCK_ASIENTOS,
  getBoletosByViajeId,
  getPasajeroById,
} from '@/infrastructure/mock/data';

const JWT_SECRET = 'b86871a49a323d1eec8b70b0f8fa4f58734f456dd54da6e70401444a853513f806129ba0774425ec5bd3b40ae8e9ca47d234e660a516cf527514a87fde8735f6';
const PORT = 5000;

// ============================================================
// USUARIOS (para autenticación mock)
// Derivado de MOCK_USUARIOS con campos mock-only (password, name).
// Los usuarios auth tienen shape distinta al tipo canónico Usuario
// (que no almacena password), por eso se deriva aquí y no en data.ts.
// ============================================================

const USER_NAMES: Record<string, string> = {
  '5': 'Sebastián Bustamante',
  '1': 'Carlos Mendoza',
  '2': 'Ana Torres',
  '3': 'Luis Rojas',
  '4': 'María García',
};

const USERS = MOCK_USUARIOS
  .filter((u) => u.rol === 'superadmin' || u.rol === 'admin_agencia')
  .map((u) => ({
    id: u.id,
    email: u.email,
    password: 'password123',
    name: USER_NAMES[u.id] ?? u.email.split('@')[0],
    role: u.rol,
    ...(u.idAgencia != null ? { idAgencia: u.idAgencia } : {}),
  }));

const SESSIONS = new Map<string, { userId: string; refreshToken: string }>();

// ============================================================
// REPORTES (datos específicos del mock server, sin equivalente en types.ts)
// ============================================================

const REPORT_CONFIGS: Record<string, { columns: string[]; rows: (string | number)[][] }> = {
  ventas: {
    columns: ['AGENCIA', 'RUTA', 'FECHA VIAJE', 'PASAJEROS', 'MONTO TOTAL', 'COMISIÓN'],
    rows: [
      ['CRUZ DEL SUR', 'Lima - Trujillo', '2026-06-20', 42, 2940.0, 294.0],
      ['CRUZ DEL SUR', 'Lima - Arequipa', '2026-06-19', 38, 4180.0, 418.0],
      ['TRANSPORTES OLTURSA', 'Lima - Trujillo', '2026-06-19', 45, 2925.0, 292.5],
      ['TRANSPORTES OLTURSA', 'Lima - Arequipa', '2026-06-21', 30, 3000.0, 300.0],
    ],
  },
  viajes: {
    columns: ['FECHA', 'RUTA', 'BUS', 'PASAJEROS', 'ESTADO'],
    rows: [
      ['2026-06-20', 'Lima - Trujillo', 'CGS-101', 42, 'Programado'],
      ['2026-06-20', 'Lima - Trujillo', 'CGS-102', 38, 'Programado'],
      ['2026-06-19', 'Lima - Arequipa', 'CGS-100', 45, 'En curso'],
      ['2026-06-18', 'Lima - Trujillo', 'OLT-100', 30, 'Finalizado'],
    ],
  },
  'manifiesto-sutran': {
    columns: ['N° DOCUMENTO', 'NOMBRES', 'APELLIDOS', 'ASIENTO', 'ORIGEN', 'DESTINO'],
    rows: [
      ['DNI 72145639', 'Carlos', 'Mendoza', 'A4-1', 'Lima', 'Trujillo'],
      ['DNI 45896321', 'Ana', 'García', 'B4-1', 'Lima', 'Trujillo'],
      ['CE 9876543', 'John', 'Smith', 'A1-2', 'Lima', 'Arequipa'],
      ['PAS 887766', 'Marie', 'Dubois', 'B1-2', 'Lima', 'Arequipa'],
    ],
  },
};

// ============================================================
// UBIGEO (estructura anidada {value, label} usada por el endpoint;
// es distinta a los arrays MOCK_DEPARTAMENTOS/MOCK_PROVINCIAS/MOCK_DISTRITOS de data.ts)
// ============================================================

const UBI_DATA: {
  departments: { value: string; label: string }[];
  provinces: Record<string, { value: string; label: string }[]>;
  districts: Record<string, { value: string; label: string }[]>;
} = {
  departments: [
    { value: '15', label: 'Lima' },
    { value: '12', label: 'Junín' },
    { value: '04', label: 'Arequipa' },
    { value: '13', label: 'La Libertad' },
    { value: '08', label: 'Cusco' },
    { value: '20', label: 'Piura' },
  ],
  provinces: {
    '15': [{ value: '1501', label: 'Lima' }, { value: '1502', label: 'Callao' }],
    '12': [{ value: '1201', label: 'Huancayo' }, { value: '1202', label: 'Concepción' }],
    '04': [{ value: '0401', label: 'Arequipa' }, { value: '0402', label: 'Caylloma' }],
  },
  districts: {
    '1501': [{ value: '150101', label: 'Lima' }, { value: '150102', label: 'San Isidro' }, { value: '150103', label: 'Miraflores' }],
    '1201': [{ value: '120101', label: 'Huancayo' }, { value: '120102', label: 'Chilca' }],
    '0401': [{ value: '040101', label: 'Arequipa' }, { value: '040102', label: 'Cayma' }],
  },
};

// ============================================================
// HELPERS
// ============================================================

function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

async function parseBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: string) => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

interface JwtPayloadWithSession extends jwt.JwtPayload {
  sessionId?: string;
}

function authenticate(req: http.IncomingMessage): JwtPayloadWithSession | null {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.slice(7), JWT_SECRET) as JwtPayloadWithSession; }
  catch { return null; }
}

function json(res: http.ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function filterList<T extends Record<string, unknown>>(
  items: T[],
  params?: Record<string, string>,
  fieldMap: Record<string, string> = {}
): T[] {
  if (!params || Object.keys(params).length === 0) return items;
  return items.filter((item) =>
    Object.entries(params).every(([key, val]) => {
      if (!val) return true;
      const field = fieldMap[key] || key;
      return String(item[field] ?? '') === String(val);
    })
  );
}

function findById<T extends { id: string }>(items: T[], id: string): T | null {
  return items.find((item) => item.id === id) || null;
}

// ============================================================
// ROUTE REGISTRY
// ============================================================

interface RouteHandler {
  method: string;
  regex: RegExp;
  handler: (req: ApiRequest, res: http.ServerResponse) => void | Promise<void>;
}

const routes: RouteHandler[] = [];

function route(method: string, pattern: string, handler: (req: ApiRequest, res: http.ServerResponse) => void | Promise<void>) {
  const regex = new RegExp('^' + pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '$');
  routes.push({ method, regex, handler });
}

// ----- AUTH (7 endpoints) -----

route('POST', '/admin/auth/login', async (req, res) => {
  const { email, password } = (await parseBody(req)) as { email?: string; password?: string };
  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) return json(res, 401, { message: 'Credenciales inválidas' });

  const sessionId = crypto.randomUUID();
  const accessToken = signToken({ sub: user.id, email: user.email, name: user.name, role: user.role, sessionId });
  const refreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, JWT_SECRET, { expiresIn: '7d' });
  const accessTokenExpiresAt = new Date(Date.now() + 3600000).toISOString();
  const refreshTokenExpiresAt = new Date(Date.now() + 7 * 86400000).toISOString();

  SESSIONS.set(sessionId, { userId: user.id, refreshToken });

  json(res, 200, {
    accessToken,
    accessTokenExpiresAt,
    refreshToken,
    refreshTokenExpiresAt,
    sessionId,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

route('POST', '/admin/auth/refresh', async (req, res) => {
  const { refreshToken } = (await parseBody(req)) as { refreshToken?: string };
  try {
    const decoded = jwt.verify(refreshToken!, JWT_SECRET) as jwt.JwtPayload;
    const user = USERS.find((u) => u.id === decoded.sub);
    if (!user) return json(res, 401, { message: 'Invalid refresh token' });

    const sessionId = crypto.randomUUID();
    const newAccessToken = signToken({ sub: user.id, email: user.email, name: user.name, role: user.role, sessionId });
    const newRefreshToken = jwt.sign({ sub: user.id, type: 'refresh' }, JWT_SECRET, { expiresIn: '7d' });
    const accessTokenExpiresAt = new Date(Date.now() + 3600000).toISOString();
    const refreshTokenExpiresAt = new Date(Date.now() + 7 * 86400000).toISOString();

    SESSIONS.set(sessionId, { userId: user.id, refreshToken: newRefreshToken });

    json(res, 200, {
      accessToken: newAccessToken,
      accessTokenExpiresAt,
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt,
      sessionId,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch {
    json(res, 401, { message: 'Invalid or expired refresh token' });
  }
});

route('POST', '/admin/auth/logout', (req, res) => {
  const decoded = authenticate(req);
  if (decoded && decoded.sessionId) SESSIONS.delete(decoded.sessionId);
  json(res, 200, { message: 'Sesión cerrada' });
});

route('POST', '/admin/auth/logout-session', async (req, res) => {
  const body = (await parseBody(req)) as { refreshToken?: string };
  if (body.refreshToken) {
    for (const [sid, session] of SESSIONS) {
      if (session.refreshToken === body.refreshToken) SESSIONS.delete(sid);
    }
  }
  json(res, 200, { message: 'Sesiones cerradas' });
});

route('POST', '/admin/auth/recover-email', async (_req, res) => {
  json(res, 200, { message: 'Enlace de recuperación enviado al correo' });
});

route('POST', '/admin/auth/reset-password', async (_req, res) => {
  json(res, 200, { message: 'Contraseña restablecida exitosamente' });
});

route('POST', '/admin/auth/forgot-password', async (_req, res) => {
  json(res, 200, { message: 'Instrucciones enviadas al correo' });
});

// ----- CRUD LIST ENDPOINTS (confirmados por uso real en drilldown) -----

route('GET', '/admin/agencias', (req, res) => {
  const items = filterList(MOCK_AGENCIAS, req.query);
  json(res, 200, items);
});

route('GET', '/admin/agencias/:id', (req, res) => {
  const item = findById(MOCK_AGENCIAS, req.params.id);
  if (item) { json(res, 200, item); return; }
  json(res, 404, { message: 'Agencia no encontrada' });
});

route('GET', '/admin/flota', (req, res) => {
  const items = filterList(MOCK_BUSES, req.query);
  json(res, 200, items);
});

route('GET', '/admin/rutas', (req, res) => {
  const items = filterList(MOCK_RUTAS, req.query);
  json(res, 200, items);
});

route('GET', '/admin/viajes', (req, res) => {
  const items = filterList(MOCK_VIAJES, req.query);
  json(res, 200, items);
});

// ----- TENTATIVE ENDPOINTS (páginas que importan MOCK_* directamente, sin API aún) -----

route('GET', '/admin/terminales', (_req, res) => {
  json(res, 200, MOCK_TERMINALES);
});

route('GET', '/admin/suscripciones', (_req, res) => {
  json(res, 200, MOCK_SUSCRIPCIONES);
});

route('GET', '/admin/soporte', (_req, res) => {
  json(res, 200, MOCK_TICKETS_SOPORTE);
});

route('GET', '/admin/reclamos', (_req, res) => {
  json(res, 200, MOCK_RECLAMOS);
});

// ----- NUEVOS ENDPOINTS CRÍTICOS (agregados en migración) -----

route('GET', '/admin/asientos', (req, res) => {
  const busId = req.query.busId;
  if (!busId) return json(res, 400, { message: 'Falta parámetro busId' });
  const asientos = MOCK_ASIENTOS.filter((a) => a.idBus === busId);
  json(res, 200, asientos);
});

route('GET', '/admin/viajes/:id/boletos', (req, res) => {
  const boletos = getBoletosByViajeId(req.params.id);
  json(res, 200, boletos);
});

route('GET', '/admin/viajes/:id/pasajeros', (req, res) => {
  const boletos = getBoletosByViajeId(req.params.id);
  const pasajeros = boletos
    .map((b) => getPasajeroById(b.idPasajero))
    .filter((p): p is NonNullable<typeof p> => p != null);
  json(res, 200, pasajeros);
});

route('GET', '/admin/liquidaciones', (_req, res) => {
  json(res, 200, MOCK_LIQUIDACIONES);
});

route('GET', '/admin/api-keys', (_req, res) => {
  json(res, 200, MOCK_API_KEYS);
});

// ----- REPORT ENDPOINTS (2 endpoints) -----

route('GET', '/reports/:slug', (req, res) => {
  const reportConfig = REPORT_CONFIGS[req.params.slug];
  if (!reportConfig) return json(res, 404, { message: 'Reporte no encontrado' });

  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || String(reportConfig.rows.length), 10);
  const totalItems = reportConfig.rows.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const start = (page - 1) * limit;
  const rows = reportConfig.rows.slice(start, start + limit);

  json(res, 200, {
    report: {
      slug: req.params.slug,
      code: 'REPORTE_' + req.params.slug.toUpperCase(),
      title: 'REPORTE DE ' + req.params.slug.toUpperCase(),
      sourceRow: 1,
      parameters: [],
      columns: reportConfig.columns,
    },
    rows,
    meta: { page, limit, totalItems, totalPages, hasPrevPage: page > 1, hasNextPage: page < totalPages },
  });
});

route('GET', '/reports/:slug/export', (_req, res) => {
  const placeholder = Buffer.from('Mock Excel file content for report export.', 'utf-8');
  res.writeHead(200, {
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename="report.xlsx"',
    'Content-Length': placeholder.length,
  });
  res.end(placeholder);
});

// ----- UBIGEO ENDPOINTS (3 endpoints) -----

route('GET', '/ubigeo/departments', (_req, res) => json(res, 200, UBI_DATA.departments));
route('GET', '/ubigeo/provinces/:departmentId', (req, res) => {
  json(res, 200, UBI_DATA.provinces[req.params.departmentId] || []);
});
route('GET', '/ubigeo/districts/:provinceId', (req, res) => {
  json(res, 200, UBI_DATA.districts[req.params.provinceId] || []);
});

// ============================================================
// SERVER
// ============================================================

const server = http.createServer(async (rawReq, res) => {
  const req = rawReq as ApiRequest;
  const parsedUrl = url.parse(req.url!, true);
  let pathname = parsedUrl.pathname!;
  req.query = parsedUrl.query as Record<string, string>;

  // Strip /api prefix so routes work with both:
  //   - Next.js rewrite: /api/admin/agencias -> /admin/agencias
  //   - serverHttpClient: http://localhost:5000/api/admin/agencias -> /api/admin/agencias
  if (pathname.startsWith('/api')) {
    pathname = pathname.replace(/^\/api/, '');
  }

  const matchedRoute = routes.find((r) => {
    if (r.method !== req.method) return false;
    const match = pathname.match(r.regex);
    if (match) {
      req.params = match.groups as Record<string, string>;
      return true;
    }
    return false;
  });

  if (matchedRoute) {
    try {
      await matchedRoute.handler(req, res);
    } catch (err) {
      console.error(err);
      json(res, 500, { message: 'Internal server error' });
    }
  } else {
    json(res, 404, { message: 'Route not found: ' + req.method + ' ' + pathname });
  }
});

server.listen(PORT, () => {
  console.log('\n  Mock API server running at http://localhost:' + PORT);
  console.log('  ───────────────────────────────────────────');
  console.log('  Users (password: password123):');
  USERS.forEach((u) => console.log('  • ' + u.email + '  (' + u.role + ')'));
  console.log('');
  console.log('  Endpoints activos:');
  console.log('  • POST /admin/auth/*       (7 endpoints)');
  console.log('  • GET  /admin/agencias     (list + byId)');
  console.log('  • GET  /admin/flota        (list)');
  console.log('  • GET  /admin/rutas        (list)');
  console.log('  • GET  /admin/viajes       (list)');
  console.log('  • GET  /admin/asientos     (list por busId)');
  console.log('  • GET  /admin/viajes/:id/boletos');
  console.log('  • GET  /admin/viajes/:id/pasajeros');
  console.log('  • GET  /admin/liquidaciones');
  console.log('  • GET  /admin/api-keys');
  console.log('  • GET  /admin/terminales   (tentativo)');
  console.log('  • GET  /admin/suscripciones (tentativo)');
  console.log('  • GET  /admin/soporte      (tentativo)');
  console.log('  • GET  /admin/reclamos     (tentativo)');
  console.log('  • GET  /reports/:slug      (data + export)');
  console.log('  • GET  /ubigeo/*           (3 endpoints)');
  console.log('');
  console.log('  Fuente de datos: src/infrastructure/mock/data.ts');
  console.log('');
  console.log('  Press Ctrl+C to stop\n');
});
