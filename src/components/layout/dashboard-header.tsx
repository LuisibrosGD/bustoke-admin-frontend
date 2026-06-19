'use client';

import { Search, Bell, Menu } from 'lucide-react';
import { useSidebar, Input, Avatar, AvatarFallback } from '@/components/ui';
import { useSession } from 'next-auth/react';

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-white">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={toggleSidebar}
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors -ml-1"
          >
            <Menu className="size-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Buscar..."
              className="h-9 pl-10 bg-neutral-50 border-neutral-200 text-sm rounded-lg focus:bg-white"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative flex size-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-neutral-200">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {session?.user?.name
                  ? session.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                  : 'AD'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-neutral-800">
                {session?.user?.name || 'U Admin'}
              </span>
              <span className="text-xs text-neutral-500">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
