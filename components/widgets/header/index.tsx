import dynamic from 'next/dynamic'
import YZ13MarkSkeleton from '@/components/skeletons/YZ13-mark'
import SearchBarSkeleton from '@/components/skeletons/search-bar'
import Link from 'next/link'
const User = dynamic(() => import('./ui/user'), {
    loading: () => <div className='h-9 w-9 rounded-full shrink-0 bg-muted animate-pulse' />
})
const SearchBar = dynamic(() => import('../search-bar'), {
    loading: () => <SearchBarSkeleton />
})
const YZ13Mark = dynamic(() => import('../../shared/yz13-mark'), {
    loading: () => <YZ13MarkSkeleton />
})

const Header = () => {
    return (
        <div className='flex items-center justify-between gap-4 w-full h-full'>
            <Link href='/'><YZ13Mark /></Link>
            <SearchBar />
            <div className="flex items-center h-full gap-2 w-fit">
                <User />
            </div>
        </div>
    )
}

export default Header