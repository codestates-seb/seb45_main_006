function SkeletonUi() {
    return (
        <div
            role="status"
            className="m-10 h-300 w-260 animate-pulse space-y-4 divide-y divide-gray-200 border border-gray-200 shadow dark:divide-gray-700 dark:border-gray-700 "
        >
            <div className="flex flex-col justify-between p-20">
                <div className="h-24 w-50 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                <div className="my-20 h-36 w-216 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                <div className="flex">
                    <div className="mr-8 h-28 w-60 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                    <div className="h-28 w-130 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                </div>
                <div className="my-20 h-20 w-216 rounded-md bg-gray-200 dark:bg-gray-400"></div>

                <div className="mb-20 h-2 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex">
                    <div className="mr-16 h-44 w-44 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-44 w-140 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default SkeletonUi;
