import { blog } from "@/api/blog"
import { file } from "@/api/file"
import { Button } from "@/components/ui/button"
import { DateTime } from "luxon"
import Link from "next/link"
import { BiLeftArrowAlt } from "react-icons/bi"
import GroupPostAuthors from "./post-author-group"
import PostControls from "./post-controls"
import Image from "next/image"
import { Markdown } from "@/components/shared/markdown"
import PostTemplate from "@/components/templates/post/post.template"
import { getCategoryName } from "@/const/categories"
import { Categories } from "@/types/common"
import NewPostBadge from "@/components/shared/new-post-badge"

type Props = {
    postId: string
}
const PostPage = async({ postId }: Props) => {
    const post = await blog.getById(postId)
    const now = DateTime.now()
    const postCreatedAtDate = post ? DateTime.fromSeconds(post.createdAt) : null
    const isRecent = post && postCreatedAtDate ? now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year : false
    if (!post) return null
    return (
        <PostTemplate>
            <PostTemplate.HeaderWrapper>
                {/* image */}
                <PostTemplate.Header>
                    <Button variant='link' asChild className='px-0 text-muted-foreground hover:text-accent-foreground hover:no-underline'>
                        <Link href='/' className='flex items-center gap-2'><BiLeftArrowAlt />Вернуться на главную</Link>
                    </Button>
                    <div className="flex flex-col w-full gap-4 py-4">
                        <div className="w-fit h-fit flex items-center gap-2">
                            {
                                isRecent && <NewPostBadge />
                            }
                            {
                                post.category &&
                                <span className="w-fit h-fit px-2.5 py-1 rounded-lg border bg-background text-xs text-muted-foreground">{getCategoryName(post.category)}</span>
                            }
                            <span className='capitalize text-sm text-muted-foreground'>
                                { DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat(' EEEE, dd MMMM yyyy ') }
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-4 pt-4 pb-12">
                        <h1 className='lg:text-5xl text-2xl font-semibold normal-case text-accent-foreground'>{ post.name }</h1>
                        { post.description && <span className='lg:text-xl text-base font-light text-muted-foreground'>{ post.description }</span> }
                    </div>
                    <PostControls author={post.authorsId} postId={post.doc_id} pinned={post.pinned} />
                </PostTemplate.Header>
            </PostTemplate.HeaderWrapper>
            <PostTemplate.Body>
                <PostTemplate.Side>
                    <span className='text-muted-foreground'>Под авторством</span>
                    <GroupPostAuthors authors={post.authorsId} />
                </PostTemplate.Side>
                <PostTemplate.Separator />
                <PostTemplate.Content>
                    <Markdown pageMode>{post.content}</Markdown>
                </PostTemplate.Content>
            </PostTemplate.Body>
        </PostTemplate>
    )
}

export default PostPage