import GroupPostAuthorsMini from "@/app/(blog)/_components/post/post-author-group-mini"
import CategoryBadge from "@/components/shared/category-badge"
import NewPostBadge from "@/components/shared/new-post-badge"
import { cdn } from "@/helpers/cdn"
import { DocPost } from "@/types/post"
import { DateTime } from "luxon"
import Image from "next/image"
import Link from "next/link"
import { BiImage } from "react-icons/bi"

type Props = {
    post: DocPost
}
const SearchResult = ({ post }: Props) => {
    const now = DateTime.now()
    const postCreatedAtDate = DateTime.fromSeconds(post.createdAt)
    const isRecent = now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year
    return (
        <div className="w-full h-fit flex py-2 items-center gap-4">
            <div className="relative w-52 aspect-[4/3] rounded-lg bg-muted">
                {
                    post.thumbnail
                    ? <Image src={cdn(post.thumbnail)} fill className="object-cover rounded-lg" alt='post-thumbnail' />
                    : <div className="w-full h-full rounded-lg flex items-center justify-center"><BiImage size={28} className='text-muted-foreground' /></div>
                }
            </div>
            <div className="w-full h-fit flex flex-col gap-2">
                <div className="w-full gap-2 h-fit flex items-center justify-between">
                    <div className="w-fit gap-2 h-fit flex items-center justify-start">
                        {
                            isRecent &&
                            <NewPostBadge />
                        }
                        {
                            post.category &&
                            <CategoryBadge category={post.category} asLink />
                        }
                    </div>
                    <span className="text-sm capitalize text-muted-foreground">
                        { DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat( 'dd MMMM yyyy' ) }
                    </span>
                </div>
                <div className="w-full gap-2 h-fit flex items-center justify-between">
                    <Link href={`/blog/${post.doc_id}`} className="text-2xl font-bold text-accent-foreground line-clamp-1">{post.name}</Link>
                    <GroupPostAuthorsMini authors={post.authorsId} />
                </div>
                {
                    post.description &&
                    <span className="text-sm text-muted-foreground">{post.description}</span>
                }
            </div>
        </div>
    )
}

export default SearchResult