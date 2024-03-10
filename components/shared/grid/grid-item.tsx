import { file } from "@/api/file"
import GroupAuthorsMiniSkeleton from "@/components/skeletons/group-authors-mini"
import { cdn } from "@/helpers/cdn"
import { cn } from "@/lib/utils"
import type { DocPost } from "@/types/post"
import { DateTime } from "luxon"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import CategoryBadge from "../category-badge"
import NewPostBadge from "../new-post-badge"
const GroupPostAuthorsMini = dynamic(() => import("@/app/(blog)/_components/post/post-author-group-mini"), {
    loading: () => <GroupAuthorsMiniSkeleton />
})

type Props = {
    post: DocPost
    colSpan?: string
    rowSpan?: string
}
const GridItem = async ({ post, colSpan, rowSpan }: Props) => {
    const thumbnail = post.thumbnail ? cdn(post.thumbnail) : await file.static.get('placeholders/article-thumbnail-placeholder.jpg')
    const now = DateTime.now()
    const postCreatedAtDate = DateTime.fromSeconds(post.createdAt)
    const isRecent = now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year
    const className = cn(
        colSpan ? colSpan : "",
        "relative w-full md:h-full h-[24rem] shrink-0 overflow-hidden relative cursor-pointer border hover:!border-accent-foreground transition-colors duration-500 rounded-lg group"
    )
    return (
        <Link style={{ gridRow: rowSpan }}
            href={`/blog/${post.doc_id}`} className={className}>
            <div className="w-fit gap-2 h-fit z-20 flex items-center justify-end top-3 right-3 absolute">
                {
                    isRecent &&
                    <NewPostBadge />
                }
                {
                    post.category &&
                    <CategoryBadge category={post.category} />
                }
            </div>
            <div className="relative w-full h-full rounded-md flex items-center justify-center">
                {
                    thumbnail &&
                    <Image src={thumbnail} fill alt='article thumbnail'
                        className="object-center group-hover:scale-110 transition-transform rounded-lg object-cover" />
                }
            </div>
            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md bg-gradient-to-t from-background to-transparent group-hover:opacity-50" />
            <div className="absolute bottom-0 left-0 z-10 flex flex-col w-full gap-2 p-4 h-fit">
                <h3 className="text-accent-foreground">{post.name}</h3>
                {post.description && <span className="lg:inline hidden text-base text-muted-foreground">{post.description}</span>}
                <div className="flex items-center justify-between w-full h-fit">
                    <Suspense fallback={<GroupAuthorsMiniSkeleton />}>
                        <GroupPostAuthorsMini authors={post.authorsId} />
                    </Suspense>
                    <span className="text-sm capitalize text-muted-foreground">{DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat('dd MMMM yyyy')}</span>
                </div>
            </div>
        </Link>
    )
}

export default GridItem