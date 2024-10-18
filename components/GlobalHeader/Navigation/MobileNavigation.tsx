'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LIST } from '@/const/paths';
import { cn } from '@/lib/utils';
import { LucideMenu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" type="button">
          <LucideMenu />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="z-navigation md:hidden w-[240px]"
        overlayClassName="z-navigation"
        side="left"
      >
        <SheetHeader></SheetHeader>
        <NavigationMenu>
          <NavigationMenuList>
            {NAV_LIST.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);

              return (
                <NavigationMenuItem key={href} onClick={() => setIsOpen(false)}>
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
      </SheetContent>
    </Sheet>
  );
}
