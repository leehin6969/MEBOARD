import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    if (!user) return null;

    const { id } = await params;

    // Add debugging
    console.log("Profile page - ID from params:", id);
    console.log("Profile page - Current user ID:", user.id);

    const userInfo = await fetchUser(id);

    // If it's the current user and they haven't completed onboarding, redirect to onboarding
    if (id === user.id && !userInfo) {
        console.log("Profile page - Current user not found in database, redirecting to onboarding");
        redirect("/onboarding");
    }

    // If it's the current user and they exist but haven't completed onboarding
    if (id === user.id && userInfo && !userInfo.onboarded) {
        console.log("Profile page - Current user exists but not onboarded, redirecting to onboarding");
        redirect("/onboarding");
    }

    // If trying to view another user's profile and they don't exist
    if (!userInfo) {
        console.log("Profile page - User not found in database for ID:", id);
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <h1 className="text-heading2-bold text-light-1 mb-4">User Not Found</h1>
                <p className="text-base-regular text-light-3">
                    The user profile you're looking for doesn't exist or hasn't completed onboarding.
                </p>
            </div>
        );
    }

    // If viewing another user who exists but hasn't completed onboarding
    if (!userInfo.onboarded) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <h1 className="text-heading2-bold text-light-1 mb-4">Profile Not Available</h1>
                <p className="text-base-regular text-light-3">
                    This user hasn't completed their profile setup yet.
                </p>
            </div>
        );
    }

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full" >
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === "Threads" && (
                                    <p className="m-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}

                </Tabs>
            </div>
        </section>
    )
}

export default Page;