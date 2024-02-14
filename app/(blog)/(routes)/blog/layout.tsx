import Footer from '@/components/shared/footer'
import HeaderSkeleton from '@/components/skeletons/header'
import CategoryTemplate from '@/components/templates/category/category.template'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const Header = dynamic(() => import("@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})
type Props = {
    children: JSX.Element[]
}
const layout = ({ children }: Props) => {
    return (
        <>
            <header className="border-b w-full h-16 shrink-0">
                <div className="w-full h-full px-6 mx-auto flex items-center justify-between">
                    <Suspense fallback={<HeaderSkeleton />}>
                        <Header />
                    </Suspense>
                </div>
            </header>
            <CategoryTemplate>
                { children }
            </CategoryTemplate>
            <Footer />
        </>
    )
}

export default layout