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

  teams: [{ name: 'MD ASIF', logo:Codesandbox, plan: 'Enterprise' }],

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
        { title: 'New Customer', url: '/customer-create-update' },
        { title: 'Customer List', url: '/customer-list' },
      ],
    },
    {
      title: 'Supplier',
      url: '#',
      icon: TruckElectric,
      items: [
        { title: 'New Suplier', url: '/supplier-create-update' },
        { title: 'Supplier List', url: '/supplier-list' },
      ],
    },
    {
      title: 'Expense',
      url: '#',
      icon: Landmark,
      items: [
        { title: 'New Expense Type', url: '/expensetype-create-update' },
        { title: 'Expense Type List', url: '/expensetype-list' },
        { title: 'New Expense', url: '/expense-create-update' },
        { title: 'Expense List', url: '/expense-list' },
      ],
    },
    {
      title: 'Product',
      url: '#',
      icon: PackageSearch,
      items: [
        { title: 'New Brand', url: '/brand-create-update' },
        { title: 'Brand List', url: '/brand-list' },
        { title: 'New Category', url: '/category-create-update' },
        { title: 'CategoryList', url: '/category-list' },
        { title: 'New Product', url: '/product-create-update' },
        { title: 'Product List', url: '/product-list' },
      ],
    },
    {
      title: 'Purchase',
      url: '#',
      icon: ShoppingBag,
      items: [
        { title: 'New Purchase', url: '/purchase-create-update' },
        { title: 'Purchase List', url: '/purchase-list' },
      ],
    },
    {
      title: 'Sale',
      url: '#',
      icon: ShoppingCart,
      items: [
        { title: 'New Sale', url: '/sales-create-update' },
        { title: 'Sale List', url: '/sales-list' },
      ],
    },
    {
      title: 'Return',
      url: '#',
      icon: Tags,
      items: [
        { title: 'New Return', url: '/retrun-create-update' },
        { title: 'Return List', url: '/retrun-list' },
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
