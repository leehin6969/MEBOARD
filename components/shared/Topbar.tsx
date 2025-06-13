import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { memo } from "react";

const Topbar = memo(() => {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4" prefetch={true}>
                <Image
                    src="/assets/logo.svg"
                    alt="logo"
                    width={28}
                    height={28}
                    priority
                />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">
                    MEBOARD
                </p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image
                                    src="/assets/logout.svg"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger:
                                "pr-2 px-4"
                        }
                    }}
                />
            </div>
        </nav>
    )
});

Topbar.displayName = 'Topbar';

export default Topbar;