import { blog } from "@/api/blog"
import SearchResultSkeleton from "@/components/skeletons/search-result"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import SearchBar from "@/components/widgets/search-bar"
import SearchResult from "@/components/widgets/search-bar/search-result"
import Link from "next/link"
import { BiChevronLeft } from "react-icons/bi"

type Props = {
  params: {
    query: string
  }
}
const page = async({ params }: Props) => {
    const results = await blog.search(params.query)
    return (
        <div className="mx-auto max-w-6xl w-full h-full px-6 lg:py-12 py-6 gap-6 flex flex-col items-center">
          <div className="w-full h-fit flex items-center gap-2 justify-center">
            <Button size='icon' asChild variant='ghost' className="mr-auto">
              <Link href='/' className='text-sm text-muted-foreground'><BiChevronLeft size={20} /></Link>
            </Button>
            <div className="w-full md:max-w-md max-w-full shrink-0 h-fit mr-auto">
              <SearchBar providedQuery={params.query} />
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col gap-2">
            {
              results.length === 0
              ? <>
                <div className="w-full h-full z-10 absolute rounded-xl bg-muted opacity-45" />
                <div className="w-full h-full z-20 absolute flex items-center justify-center">
                  <span className="text-center px-2.5 border py-1 rounded-lg bg-background text-sm text-accent-foreground">Не результатов по запросу: {params.query}</span>
                </div>
                <div className="w-full h-full flex flex-col gap-2 py-3 px-4">
                  <SearchResultSkeleton />
                  <SearchResultSkeleton />
                  <SearchResultSkeleton />
                </div>
              </>
              : results.map(result => 
                <>
                  <SearchResult key={result.doc_id} post={result} />
                  <Separator />
                </>
              )
            }
          </div>
        </div>
    )
}

export default page