import { blog } from '@/api/blog'
import PostForm from '../../../_components/post-editor'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { compareAuthor } from '@/helpers/author'
import { have_access } from '@/const/access-to-publish'
import { Suspense } from 'react'
import HeaderSkeleton from '@/components/skeletons/header'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import("@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})
type Props = {
    searchParams: {
        postId?: string
    }
}
const page = async ({ searchParams }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const postId = searchParams.postId
    const post = postId ? await blog.getById(postId) : null
    const isCommunityMode = uid ? !have_access.includes(uid) : false
    const isTeamMode = uid ? have_access.includes(uid) : false
    const postMode: 'team' | 'community' = isCommunityMode ? 'community' : isTeamMode ? 'team' : 'community' // team | community
    // console.log(post, postId)
    if (!uid) redirect('/')
    if (uid && postId && !post) redirect('/upload/post')
    if (uid && post && postId && compareAuthor(uid, post.authorsId) === false) redirect('/upload/post')
    // if (uid && !have_access.includes(uid)) redirect('/')
    return (
        <>
            <header className='w-full h-16 px-6 border-b shrink-0'>
                <Suspense fallback={<HeaderSkeleton />}>
                    <Header />
                </Suspense>
            </header>
            <div className='w-full h-full max-w-5xl px-6 mx-auto'>
                <PostForm preloadPost={post} postId={postId} mode={postMode} />
            </div>
        </>
    )
}

export default page