import HeaderSkeleton from "@/components/skeletons/header"
import Header from "@/components/widgets/header"
import { Suspense } from "react"

type Props = {
    children: JSX.Element | JSX.Element[]
}
const layout = ({ children }: Props) => {
    return (
        <>
            <header className="border-b w-full h-16 shrink-0">
                <div className="w-full max-w-7xl h-full px-6 mx-auto flex items-center justify-between">
                    <Suspense fallback={<HeaderSkeleton />}>
                        <Header />
                    </Suspense>
                </div>
            </header>
            { children }
        </>
    )
}

export default layout