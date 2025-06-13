"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useUser } from "@clerk/nextjs";
import { memo } from "react";

import { sidebarLinks } from "@/constants";

const LeftSidebar = memo(() => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Debug logging
  console.log("LeftSidebar - User state:", {
    userId: user?.id,
    isLoaded,
    userExists: !!user
  });

  // Don't render the navigation until auth is loaded
  if (!isLoaded) {
    return (
      <section className='custom-scrollbar leftsidebar'>
        <div className='flex w-full flex-1 flex-col gap-6 px-6'>
          {sidebarLinks.map((link) => (
            <div key={link.label} className="leftsidebar_link animate-pulse">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 rounded max-lg:hidden"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
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
              className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
              prefetch={true}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                priority={isActive}
              />

              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer gap-4 p-4' onClick={() => router.push("/sign-in")}>
              <Image
                src='/assets/logout.svg'
                alt='logout'
                width={24}
                height={24}
              />

              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
});

LeftSidebar.displayName = 'LeftSidebar';

export default LeftSidebar;