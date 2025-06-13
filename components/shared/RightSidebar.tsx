import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

import UserCard from "../cards/UserCard";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

async function SuggestedCommunities() {
  const suggestedCommunities = await fetchCommunities({ pageSize: 4 });

  return (
    <div className='flex flex-1 flex-col justify-start'>
      <h3 className='text-heading4-medium text-light-1'>
        Suggested Communities
      </h3>

      <div className='mt-7 flex w-[350px] flex-col gap-9'>
        {suggestedCommunities.communities.length > 0 ? (
          <>
            {suggestedCommunities.communities.map((community) => (
              <UserCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                personType='Community'
              />
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>
            No communities yet
          </p>
        )}
      </div>
    </div>
  );
}

async function SimilarMinds({ userId }: { userId: string }) {
  const similarMinds = await fetchUsers({
    userId: userId,
    pageSize: 4,
  });

  return (
    <div className='flex flex-1 flex-col justify-start'>
      <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
      <div className='mt-7 flex w-[350px] flex-col gap-10'>
        {similarMinds.users.length > 0 ? (
          <>
            {similarMinds.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No users yet</p>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col justify-start">
      <div className="h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
      <div className="mt-7 flex w-[350px] flex-col gap-9">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-300 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;

  return (
    <section className='custom-scrollbar rightsidebar'>
      <Suspense fallback={<LoadingSkeleton />}>
        <SuggestedCommunities />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <SimilarMinds userId={user.id} />
      </Suspense>
    </section>
  );
}

export default RightSidebar;