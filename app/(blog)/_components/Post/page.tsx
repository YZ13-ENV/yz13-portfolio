import { blog } from "@/api/blog"
import { file } from "@/api/file"
import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import GroupPostAuthors from "./post-author-group"
import PostControls from "./post-controls"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Markdown } from "@/components/shared/markdown"

type Props = {
    postId: string
}
const PostPage = async({ postId }: Props) => {
    const post = await blog.getById(postId)
    const grid = await file.static.get('grids/article-grid.svg')
    if (!post) return null
    return (
        // max-w-7xl
        <div style={{ height: 'calc(100dvh - 64px)' }} className='w-full mx-auto'>
            {/* bg-gradient-to-b from-muted to-transparent */}
            <div className="relative w-full min-h-[30vh] h-fit pt-6">
                { 
                    grid && 
                    <div className='z-[-1] w-full h-full absolute top-0 left-0'>
                        <div className="w-full h-full z-0 bg-gradient-to-t from-background via-transparent to-background" />
                        <Image src={grid} className='z-[-1] object-cover' fill alt='grid' /> 
                    </div>
                }
                <div className="z-20 flex flex-col px-6 max-w-7xl items-start w-full mx-auto h-fit">
                    <Button variant='link' asChild className='px-0 text-muted-foreground hover:text-accent-foreground hover:no-underline'>
                        <Link href='/' className='flex items-center gap-2'><BiLeftArrowAlt />Вернуться на главную</Link>
                    </Button>
                    <div className="flex flex-col w-full gap-4 py-4">
                        <span className='capitalize text-sm text-muted-foreground'>
                            { DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat(' EEEE, dd MMMM yyyy ') }
                        </span>
                    </div>
                    <div className="flex flex-col w-full gap-4 pt-4 pb-12">
                        <h1 className='lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground'>{ post.name }</h1>
                        { post.description && <span className='lg:text-xl text-base font-light text-muted-foreground'>{ post.description }</span> }
                    </div>
                    <PostControls author={post.authorsId} postId={post.doc_id} />
                </div>
            </div>
            <div className="w-full h-full flex mx-auto max-w-7xl lg:flex-row-reverse flex-col">
                <div className="flex lg:w-1/4 w-full items-start flex-col p-6 gap-2 mx-auto h-fit">
                    <span className='text-muted-foreground'>Под авторством</span>
                    <GroupPostAuthors authors={post.authorsId} />
                </div>
                <Separator className='lg:hidden block ' orientation='horizontal' />
                <div className="w-3/4 lg:border-r px-6 pt-6 border-0">
                    <Markdown pageMode>{post.content}</Markdown>
                </div>
            </div>
        </div>
    )
}

export default PostPage