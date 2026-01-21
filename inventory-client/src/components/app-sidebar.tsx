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
        { title: 'New Customer', url: '/customer-create-update' },
        { title: 'Customer List', url: '/customer-list' },
      ],
    },
    {
      title: 'Supplier',
      url: '/supplier-list',
      icon: TruckElectric,
      items: [
        { title: 'New Suplier', url: '/supplier-create-update' },
        { title: 'Supplier List', url: '/supplier-list' },
      ],
    },
    {
      title: 'Expense',
      url: '/expense-list',
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
      url: '/product-list',
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
      url: '/purchase-list',
      icon: ShoppingBag,
      items: [
        { title: 'New Purchase', url: '/purchase-create-update' },
        { title: 'Purchase List', url: '/purchase-list' },
      ],
    },
    {
      title: 'Sale',
      url: '/sales-list',
      icon: ShoppingCart,
      items: [
        { title: 'New Sale', url: '/sales-create-update' },
        { title: 'Sale List', url: '/sales-list' },
      ],
    },
    {
      title: 'Return',
      url: '/retrun-list',
      icon: Tags,
      items: [
        { title: 'New Return', url: '/retrun-create-update' },
        { title: 'Return List', url: '/retrun-list' },
      ],
    },
    {
      title: 'Report',
      url: '/expense-report',
      icon: ChartNoAxesCombined,
      items: [
        { title: 'Expense Report', url: '/expense-report' },
        { title: 'Purchase Report', url: '/purchase-report' },
        { title: 'Sale Report', url: '/Sale-report' },
        { title: 'Return Report', url: '/retrun-report' },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent className="mt-2">
          <NavMain items={data.navMain} />
        </SidebarContent>
        {/* <SidebarFooter><NavUser user={data.user} /></SidebarFooter> */}
        <SidebarRail />
      </Sidebar>
    </>
  );
}
