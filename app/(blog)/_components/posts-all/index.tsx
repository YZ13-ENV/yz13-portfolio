import { blog } from "@/api/blog"
import { Post } from "@/types/post"
import Controller from "./controller"
import PostCard from "./post-card"

type Props = {
    category?: Post['category']
}
const AllPosts = async ({ category }: Props) => {
    const { count, data, next } = await blog.getAll(category)
    return (
        <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="w-full py-6">
                <h2 className="lg:text-4xl text-2xl font-bold">Все посты</h2>
            </div>
            {
                data && data.length === 0
                    ? <div className='w-full h-64 flex items-center justify-center'>
                        <span>Нет опубликованных постов</span>
                    </div>
                    :
                    <div className="w-full h-fit grid md:grid-cols-2 grid-cols-1 gap-y-16 gap-x-8 my-6 auto-rows-auto">
                        {
                            data && data
                                .map(post => <PostCard key={'all' + '-' + post.doc_id} post={post} />)
                        }
                        <Controller count={count} next={next} />
                    </div>
            }
        </div>
    )
}

export default AllPosts