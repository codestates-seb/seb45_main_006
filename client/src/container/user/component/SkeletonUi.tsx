function SkeletonUi() {
    return (
        <div
            role="status"
            className="m-10 h-291 w-240 animate-pulse space-y-4 divide-y divide-gray-200 border border-gray-200 p-12 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
        >
            <div className="flex w-full flex-col items-center justify-between">
                <div className="mx-8 h-130 w-full rounded-md bg-gray-200 dark:bg-gray-400"></div>
                <div className="flex justify-between">
                    <div className="my-10 mr-8 h-27 w-110 rounded-md bg-gray-200 pb-10 dark:bg-gray-700"></div>
                    <div className="my-10 h-27 w-100 rounded-md bg-gray-200 pb-10 dark:bg-gray-700"></div>
                </div>
                <div className="h-2 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-10 h-80 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default SkeletonUi;
