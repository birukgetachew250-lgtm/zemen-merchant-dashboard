
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  LineChart,
  Settings,
  Building2,
  LifeBuoy,
  Wallet,
  UserCog,
  ShieldCheck,
  FileCog,
  KeyRound,
  UserCircle,
  Building,
  PlugZap
} from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';


const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/payments', label: 'Payments', icon: Wallet },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/merchants', label: 'Merchants', icon: Building2 },
  { href: '/operators', label: 'Operators', icon: Users },
  { href: '/reports', label: 'Reports', icon: LineChart },
];

const settingsMenuItems = [
    { href: '/settings/profile', label: 'Profile', icon: UserCircle },
    { href: '/settings/users', label: 'Users', icon: Users },
    { href: '/settings/roles', label: 'Roles & Permissions', icon: UserCog },
    { href: '/settings/branches', label: 'Branches', icon: Building },
    { href: '/settings/gateway', label: 'Gateway', icon: PlugZap },
    { href: '/settings/workflows', label: 'Workflows', icon: FileCog },
    { href: '/settings/security', label: 'Security', icon: KeyRound },
]

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-semibold font-headline whitespace-nowrap">Zemen Merchant Hub</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <div>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <Collapsible asChild>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                    isActive={pathname.startsWith('/settings')}
                    tooltip="Settings"
                    className="justify-start"
                  >
                  <div><Settings className="h-4 w-4" /><span>Settings</span></div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
               <CollapsibleContent asChild>
                 <SidebarMenuSub>
                    {settingsMenuItems.map((item) => (
                        <SidebarMenuSubItem key={item.href}>
                            <Link href={item.href} passHref>
                                <SidebarMenuSubButton asChild isActive={pathname === item.href}>
                                     <div>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </div>
                                </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuSubItem>
                    ))}
                 </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <SidebarMenuItem>
             <Link href="#" passHref>
                <SidebarMenuButton asChild tooltip="Support" className="justify-start">
                    <div><LifeBuoy className="h-4 w-4" /><span>Support</span></div>
                </SidebarMenuButton>
              </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
