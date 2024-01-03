import { Button } from "@/components/ui/button"
import SearchBar from "@/components/widgets/search-bar"
import Link from "next/link"
import { BiChevronLeft } from "react-icons/bi"

const page = () => {
    return (
        <div className="mx-auto max-w-6xl w-full h-full px-6 py-12 flex flex-col items-center">
            <div className="w-full h-fit flex items-center gap-2 justify-center">
                <Button size='icon' asChild variant='ghost' className="mr-auto">
                    <Link href='/' className='text-sm text-muted-foreground'><BiChevronLeft size={20} /></Link>
                </Button>
                <div className="w-full md:max-w-md max-w-full shrink-0 h-fit mr-auto">
                    <SearchBar />
                </div>
            </div>
            <div className="w-full h-96 flex flex-col items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Введите запрос выше...</span>
            </div>
        </div>
    )
}

export default page