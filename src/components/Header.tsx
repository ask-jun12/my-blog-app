import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const navigationItems = [
  { label: "HOME", href: "/" },
  { label: "SEARCH", href: "/search" },
  { label: "PROFILE", href: "/profile" },
];

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto h-[164px] flex justify-between items-center px-20">
        <Link href="/" className="font-bold text-2xl">
          Jun&apos;s BLOG
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-10">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="font-body-text text-black text-xl whitespace-nowrap hover:bg-sky-400 hover:text-white transition-opacity"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
