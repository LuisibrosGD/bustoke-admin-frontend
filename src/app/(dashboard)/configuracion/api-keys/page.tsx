'use client';

import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { Copy, Key, Trash2 } from 'lucide-react';
import { MOCK_API_KEYS, getAgenciaById } from '@/infrastructure/mock/data';

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">API Keys</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Gestión de claves de API para integraciones externas.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            Total de {MOCK_API_KEYS.length} claves registradas
          </p>
          <Button>
            <Key className="size-4" />
            Crear API Key
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agencia</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead>Vence</TableHead>
              <TableHead>Último uso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_API_KEYS.map((k) => (
              <TableRow key={k.id}>
                <TableCell className="font-medium text-neutral-900">{getAgenciaById(k.idAgencia)?.razonSocial ?? k.idAgencia}</TableCell>
                <TableCell>
                  <code className="text-xs bg-neutral-100 px-2 py-1 rounded">{k.token.slice(0, 16)}...</code>
                </TableCell>
                <TableCell>{new Date(k.fechaCreacion).toLocaleDateString('es-PE')}</TableCell>
                <TableCell>{new Date(k.fechaExpiracion).toLocaleDateString('es-PE')}</TableCell>
                <TableCell>{k.ultimoUso ? new Date(k.ultimoUso).toLocaleDateString('es-PE') : '—'}</TableCell>
                <TableCell>
                  <Badge variant={k.activo ? 'success' : 'neutral'}>{k.activo ? 'Activo' : 'Inactivo'}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <Copy className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
