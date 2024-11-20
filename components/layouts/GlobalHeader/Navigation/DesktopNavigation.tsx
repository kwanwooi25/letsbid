'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NAV_LIST } from '@/const/paths';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="flex items-center gap-2">
        {NAV_LIST.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);

          return (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({
                    className: cn(
                      'transition-opacity opacity-60 hover:opacity-80',
                      isActive && 'opacity-100',
                    ),
                  })}
                >
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
