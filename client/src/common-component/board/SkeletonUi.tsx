function SkeletonUi() {
    return (
        <div
            role="status"
            className="w-full animate-pulse space-y-4 divide-y divide-gray-200 border border-gray-200 p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
        >
            <div className="flex h-250 w-full flex-col items-center justify-between">
                <div className="flex w-full">
                    <div className="mr-8 h-123 flex-1 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                    <div className="mr-8 h-123 w-2 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                    <div className="h-123 w-45 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                </div>
                <div className="h-2 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-100 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default SkeletonUi;
