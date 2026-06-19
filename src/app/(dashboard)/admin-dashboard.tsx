'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  Building2,
  Bus,
  Route,
  Map,
  Users,
  CircleDollarSign,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
} from 'lucide-react';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { cn } from '@/lib/utils/style';

const monthlyTrips = [
  { month: 'Ene', viajes: 120 },
  { month: 'Feb', viajes: 135 },
  { month: 'Mar', viajes: 110 },
  { month: 'Abr', viajes: 148 },
  { month: 'May', viajes: 156 },
  { month: 'Jun', viajes: 142 },
  { month: 'Jul', viajes: 168 },
  { month: 'Ago', viajes: 155 },
  { month: 'Sep', viajes: 140 },
  { month: 'Oct', viajes: 152 },
  { month: 'Nov', viajes: 160 },
  { month: 'Dic', viajes: 156 },
];

const agencyDistribution = [
  { name: 'Lima', value: 4 },
  { name: 'Arequipa', value: 3 },
  { name: 'Cusco', value: 2 },
  { name: 'Trujillo', value: 2 },
  { name: 'Piura', value: 1 },
];

const recentActivities = [
  { id: 1, descripcion: 'Nuevo viaje registrado: Lima-Arequipa', estado: 'Completado' as const, hora: 'Hace 5 min' },
  { id: 2, descripcion: 'Bus B-048 actualizado en flota', estado: 'En progreso' as const, hora: 'Hace 15 min' },
  { id: 3, descripcion: 'Ruta R-007 modificada', estado: 'Completado' as const, hora: 'Hace 1 hora' },
  { id: 4, descripcion: 'Pago de pasajero #2480 confirmado', estado: 'Completado' as const, hora: 'Hace 2 horas' },
  { id: 5, descripcion: 'Nueva agencia registrada en Cusco', estado: 'Pendiente' as const, hora: 'Hace 3 horas' },
];

const upcomingTrips = [
  { hora: '08:00', origen: 'Lima', destino: 'Arequipa', pasajeros: 40 },
  { hora: '09:30', origen: 'Arequipa', destino: 'Cusco', pasajeros: 32 },
  { hora: '11:00', origen: 'Lima', destino: 'Trujillo', pasajeros: 28 },
  { hora: '14:00', origen: 'Cusco', destino: 'Lima', pasajeros: 35 },
  { hora: '16:30', origen: 'Piura', destino: 'Lima', pasajeros: 22 },
];

const alerts = [
  {
    type: 'error' as const,
    title: 'Bus B-012 fuera de servicio',
    description: 'Mantenimiento no programado detectado. Revisar taller disponible.',
  },
  {
    type: 'warning' as const,
    title: 'Ruta R-003 con retrasos',
    description: 'Condiciones climáticas adversas en la carretera Central.',
  },
  {
    type: 'info' as const,
    title: 'Actualización de tarifas',
    description: 'Nuevas tarifas aprobadas para rutas del sur. Revisar precios.',
  },
];

const KPIs = [
  { title: 'Agencias', value: '12', icon: Building2, bg: 'bg-blue-50', text: 'text-blue-600', subtitle: 'Agencias activas' },
  { title: 'Flota', value: '48', icon: Bus, bg: 'bg-emerald-50', text: 'text-emerald-600', subtitle: 'Buses operativos' },
  { title: 'Rutas', value: '7', icon: Route, bg: 'bg-purple-50', text: 'text-purple-600', subtitle: 'Rutas activas' },
  { title: 'Viajes', value: '156', icon: Map, bg: 'bg-amber-50', text: 'text-amber-600', subtitle: 'Este mes' },
  { title: 'Pasajeros', value: '2,480', icon: Users, bg: 'bg-cyan-50', text: 'text-cyan-600', subtitle: 'Este mes' },
  { title: 'Recaudación', value: 'S/ 124,500', icon: CircleDollarSign, bg: 'bg-rose-50', text: 'text-rose-600', subtitle: 'Este mes' },
];

const alertIconMap = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const alertStyleMap = {
  error: 'bg-red-50 border-red-200 text-red-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
} as const;

const activityBadgeMap = {
  'Completado': 'success' as const,
  'En progreso': 'info' as const,
  'Pendiente': 'warning' as const,
} as const;

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Panel de Administracion</h1>
        <p className="mt-1 text-sm text-neutral-500">Resumen general del sistema de transporte</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {KPIs.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="group relative overflow-hidden rounded-xl border border-neutral-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-neutral-300"
            >
              <div className="flex items-start justify-between">
                <div className={cn('flex size-11 items-center justify-center rounded-lg', kpi.bg)}>
                  <Icon className={cn('size-5', kpi.text)} />
                </div>
                <ArrowUpRight className="size-4 text-neutral-300 transition-colors group-hover:text-neutral-400" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">{kpi.title}</p>
                <p className={cn('mt-1 text-2xl font-bold tracking-tight', kpi.text)}>{kpi.value}</p>
                <p className="mt-1 text-xs text-neutral-400">{kpi.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-base font-semibold text-neutral-900">Viajes por mes</h2>
          <p className="mb-4 text-xs text-neutral-500">Evolucion mensual de viajes realizados</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrips} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viajesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8c8c8c' }} axisLine={{ stroke: '#e5e5e5' }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#8c8c8c' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '13px',
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="viajes"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#viajesGradient)"
                  dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-base font-semibold text-neutral-900">Distribucion por agencia</h2>
          <p className="mb-4 text-xs text-neutral-500">Cantidad de agencias por ciudad</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agencyDistribution} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8c8c8c' }} axisLine={{ stroke: '#e5e5e5' }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#8c8c8c' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '13px',
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-base font-semibold text-neutral-900">Ultimas actividades</h2>
          <p className="mb-4 text-xs text-neutral-500">Movimientos recientes del sistema</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actividad</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-neutral-700">{activity.descripcion}</p>
                      <p className="mt-0.5 text-xs text-neutral-400">{activity.hora}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={activityBadgeMap[activity.estado]} className="text-xs">
                      {activity.estado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-base font-semibold text-neutral-900">Proximos viajes</h2>
          <p className="mb-4 text-xs text-neutral-500">Salidas programadas para hoy</p>
          <div className="space-y-3">
            {upcomingTrips.map((trip, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-neutral-50/50 p-3 transition-colors hover:bg-neutral-100/50"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white">
                  <Clock className="size-4 text-neutral-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-900">{trip.hora}</span>
                    <span className="text-xs text-neutral-400">—</span>
                    <span className="text-xs font-medium text-neutral-600">{trip.origen}</span>
                    <ArrowUpRight className="size-3 text-neutral-400" />
                    <span className="text-xs font-medium text-neutral-600">{trip.destino}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-400">{trip.pasajeros} pasajeros</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-base font-semibold text-neutral-900">Alertas</h2>
          <p className="mb-4 text-xs text-neutral-500">Notificaciones importantes del sistema</p>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const AlertIcon = alertIconMap[alert.type];
              return (
                <div
                  key={index}
                  className={cn('flex gap-3 rounded-lg border p-3', alertStyleMap[alert.type])}
                >
                  <AlertIcon className="mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="mt-0.5 text-xs opacity-80">{alert.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
