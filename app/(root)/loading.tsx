export default function Loading() {
    return (
        <div className="flex flex-col gap-10 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>

            <section className="mt-9 flex flex-col gap-10">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="bg-dark-2 p-7 rounded-xl">
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
        </div>
    );
} 