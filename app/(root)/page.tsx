import { Suspense } from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";

function ThreadsLoadingSkeleton() {
  return (
    <section className="mt-9 flex flex-col gap-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-dark-2 p-7 rounded-xl animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
              <div className="flex flex-col items-center">
                <div className="relative h-11 w-11 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex w-full flex-col">
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

async function ThreadsList() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.length === 0 ? (
        <p className="no-result">Go touch grass!</p>
      ) : (
        <>
          {result.posts.map((post) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user?.id || ""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
        </>
      )}
    </section>
  );
}

export default async function Home() {
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <Suspense fallback={<ThreadsLoadingSkeleton />}>
        <ThreadsList />
      </Suspense>
    </>
  )
} 