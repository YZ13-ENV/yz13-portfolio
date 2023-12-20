import { blog } from '@/api/blog'
import GridItem from '@/components/shared/grid/grid-item'
import GridTemplate from '@/components/shared/grid/grid-template'
import { CategoriesGridRatio, defaultRatio } from '@/const/categories'
import { Post } from '@/types/post'

type Props = {
  category?: Post['category']
}
const LastPosts = async({ category='all' }: Props) => {
    const posts = await blog.getLast(category)
    return (
      <div className="w-full max-w-7xl p-6 mx-auto">
        <div className="w-full py-6">
          <h1 className="text-3xl font-bold">Последние посты</h1>
        </div>
        <GridTemplate>
          {
            posts.map((post, index) => {
              const ratio = category 
              ? CategoriesGridRatio[category].split('-') 
              : defaultRatio.split('-')
              const span = `span ${ratio[index]} / span ${ratio[index]}`
              return <GridItem key={post.doc_id} post={post} rowSpan={span} />
            })
          }
        </GridTemplate>
    </div>
    )
}

export default LastPosts