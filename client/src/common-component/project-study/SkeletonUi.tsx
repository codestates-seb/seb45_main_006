function SkeletonUi() {
    return (
        <div
            role="status"
            className="my-10 h-160 w-full animate-pulse space-y-4 divide-y divide-gray-200 border border-gray-200 p-20 shadow dark:divide-gray-700 dark:border-gray-700"
        >
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                    <div className="mb-4 h-24 w-50 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                    <div className="mb-4 mr-8 h-30 w-600 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                    <div className="flex">
                        <div className="mb-4 mr-8 h-30 w-60 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                        <div className="mb-4 mr-8 h-30 w-120 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                        <div className="mb-4 mr-8 h-30 w-90 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                    </div>
                    <div className="mr-8 h-30 w-180 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                </div>
                <div className="flex h-120 items-center">
                    <div className="h-30 w-30 rounded-md bg-gray-200 dark:bg-gray-400"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default SkeletonUi;
