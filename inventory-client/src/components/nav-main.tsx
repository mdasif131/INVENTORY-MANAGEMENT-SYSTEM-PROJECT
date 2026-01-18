import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();

  // Helper function to check if a path is active
  const isPathActive = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  // Helper function to check if parent item should be active
  const isParentActive = (item: (typeof items)[0]) => {
    if (isPathActive(item.url)) return true;
    return item.items?.some(subItem => isPathActive(subItem.url)) || false;
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          const parentActive = isParentActive(item);

          // First item renders without collapsible
          if (index === 0) {
            return (
              <SidebarMenuItem
                key={item.title}
                className={` transition-colors py-3 rounded-r-lg hover:bg-blue-50 ${
                  parentActive
                    ? ' text-blue-600 border-r-2 border-blue-600 bg-blue-50'
                    : ''
                }`}
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                  <Link to={item.url} className='flex items-center justify-center gap-1'>
                    {item.icon && <item.icon size={18}/>}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // All other items render with collapsible
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || parentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem className="py-3 ">
                <CollapsibleTrigger
                  asChild
                  className={`transition-colors rounded-r-lg hover:bg-blue-50 group${
                    parentActive
                      ? ' text-blue-600 border-r-2 border-blue-600 bg-blue-50'
                      : ''
                  }`}
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`cursor-pointer hover:bg-blue-50`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => {
                      const subActive = isPathActive(subItem.url);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={subItem.url}
                              className={
                                subActive
                                  ? 'text-blue-600 border-r-2 border-blue-600 bg-blue-50'
                                  : ''
                              }
                            >
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
