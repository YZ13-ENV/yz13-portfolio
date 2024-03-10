import Footer from "@/components/shared/footer"
import HeaderSkeleton from "@/components/skeletons/header"
import AllPostsSkeleton from "@/components/skeletons/posts-all"
import LastPostsSkeleton from "@/components/skeletons/posts-last"
import CategoryTemplate from "@/components/templates/category/category.template"
import dynamic from "next/dynamic"
import { Suspense } from "react"
const AllPosts = dynamic(() => import("./(blog)/_components/posts-all"), {
  loading: () => <AllPostsSkeleton />
})
const LastPosts = dynamic(() => import("./(blog)/_components/posts-last"), {
  loading: () => <LastPostsSkeleton />
})
const Header = dynamic(() => import("@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

const Home = async () => {
  return (
    <>
      <header className="w-full h-16 shrink-0">
        <div className="w-full h-full px-6 mx-auto flex items-center justify-between">
          <Suspense fallback={<HeaderSkeleton />}>
            <Header />
          </Suspense>
        </div>
      </header>
      <CategoryTemplate>
        <CategoryTemplate.Header />
        <CategoryTemplate.PinnedPosts>
          <Suspense fallback={<LastPostsSkeleton />}>
            <LastPosts />
          </Suspense>
        </CategoryTemplate.PinnedPosts>
        <CategoryTemplate.AllPosts>
          <Suspense fallback={<AllPostsSkeleton />}>
            <AllPosts />
          </Suspense>
        </CategoryTemplate.AllPosts>
      </CategoryTemplate>
      <Footer />
    </>
  )
}

export default Home