"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { memo } from "react";

import { sidebarLinks } from "@/constants";

const Bottombar = memo(() => {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Debug logging
  console.log("Bottombar - User state:", {
    userId: user?.id,
    isLoaded,
    userExists: !!user
  });

  // Don't render the navigation until auth is loaded
  if (!isLoaded) {
    return (
      <section className='bottombar'>
        <div className='bottombar_container'>
          {sidebarLinks.map((link) => (
            <div key={link.label} className="bottombar_link animate-pulse">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-12 h-3 bg-gray-300 rounded max-sm:hidden"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // Create a copy of the link to avoid mutating the original
          let linkRoute = link.route;

          // Only modify the profile route if we have a valid user ID
          if (link.route === "/profile" && user?.id) {
            linkRoute = `${link.route}/${user.id}`;
          }

          return (
            <Link
              href={linkRoute}
              key={link.label}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
              prefetch={true}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className='object-contain'
                priority={isActive}
              />

              <p className='text-subtle-medium text-light-1 max-sm:hidden'>
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
});

Bottombar.displayName = 'Bottombar';

export default Bottombar;