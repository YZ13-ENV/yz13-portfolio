
const SearchResultSkeleton = () => {
    return (
        <div className="w-full h-fit flex py-2 items-center gap-4">
            <div className="relative w-52 aspect-[4/3] rounded-lg bg-muted" />
            <div className="w-full h-full flex flex-col gap-2">
                <div className="w-full gap-2 h-fit flex items-center justify-between">
                    <div className="w-fit gap-2 h-fit flex items-center justify-start">
                    <div className="w-24 h-6 rounded-md bg-muted" />
                    </div>
                    <span className="w-24 h-6 rounded-md bg-muted" />
                </div>
                <div className="w-full gap-2 h-fit flex items-center justify-between">
                    <a className="w-1/2 h-8 bg-muted rounded-lg" />
                    <div className="w-7 h-7 rounded-full bg-muted" />
                </div>
                <span className="w-1/3 h-6 bg-muted rounded-md" />
            </div>
        </div>
    )
}

export default SearchResultSkeleton