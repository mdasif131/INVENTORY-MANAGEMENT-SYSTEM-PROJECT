'use client';

import {
  ChartNoAxesCombined,
  Codesandbox,
  Landmark,
  LayoutDashboard,
  PackageSearch,
  ShoppingBag,
  ShoppingCart,
  Tags,
  TruckElectric,
  Users,
} from 'lucide-react';
import * as React from 'react';

import { TeamSwitcher } from '../components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from '../components/ui/sidebar';
import { NavMain } from './nav-main';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },

  teams: [{ name: 'MD ASIF', logo: Codesandbox, plan: 'Enterprise' }],

  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Customer',
      url: '/customer',
      icon: Users,
      items: [
        { title: 'New Customer', url: '#' },
        { title: 'Customer List', url: '#' },
      ],
    },
    {
      title: 'Supplier',
      url: '#',
      icon: TruckElectric,
      items: [
        { title: 'New Suplier', url: '#' },
        { title: 'Supplier List', url: '#' },
      ],
    },
    {
      title: 'Expense',
      url: '#',
      icon: Landmark,
      items: [
        { title: 'New Expense Type', url: '#' },
        { title: 'Expense Type List', url: '#' },
        { title: 'New Expense', url: '#' },
        { title: 'Expense List', url: '#' },
      ],
    },
    {
      title: 'Product',
      url: '#',
      icon: PackageSearch,
      items: [
        { title: 'New Brand', url: '#' },
        { title: 'Brand List', url: '#' },
        { title: 'New Category', url: '#' },
        { title: 'CategoryList', url: '#' },
        { title: 'New Product', url: '#' },
        { title: 'Product List', url: '#' },
      ],
    },
    {
      title: 'Purchase',
      url: '#',
      icon: ShoppingBag,
      items: [
        { title: 'New Purchase', url: '#' },
        { title: 'Purchase List', url: '#' },
      ],
    },
    {
      title: 'Sale',
      url: '#',
      icon: ShoppingCart,
      items: [
        { title: 'New Sale', url: '#' },
        { title: 'Sale List', url: '#' },
      ],
    },
    {
      title: 'Return',
      url: '#',
      icon: Tags,
      items: [
        { title: 'New Return', url: '#' },
        { title: 'Return List', url: '#' },
      ],
    },
    {
      title: 'Report',
      url: '#',
      icon: ChartNoAxesCombined,
      items: [
        { title: 'Sale Report', url: '#' },
        { title: 'Return Report', url: '#' },
        { title: 'Purchase Report', url: '#' },
        { title: 'Expense Report', url: '#' },
      ],
    },
  ],

  projects: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className='mt-2'>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter><NavUser user={data.user} /></SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
