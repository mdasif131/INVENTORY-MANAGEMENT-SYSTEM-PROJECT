import type { ReactNode } from 'react';
import { AppSidebar } from '../../components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from '../../components/ui/breadcrumb';
import { Separator } from '../../components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '../../components/ui/sidebar';
import MyDropDown from './MyDropDown';

export const MainLayout =({ children }: { children: ReactNode })=>{
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-18 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 border-b border-blue-500">
          <div className="flex items-center justify-between gap-2 px-4  w-full ">
            <div className="flex items-center justify-center ">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className='text-xl font-bold text-blue-500'>Inventory Management System</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div>
              <MyDropDown />
            </div>
          </div>
        </header>
        <section className="flex flex-1 flex-col gap-4 p-4  bg-gray-100">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
