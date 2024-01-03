import dynamic from 'next/dynamic'
import YZ13MarkSkeleton from '@/components/skeletons/YZ13-mark'
import SearchBarSkeleton from '@/components/skeletons/search-bar'
import Link from 'next/link'
import { ProjectsGrid } from 'ui'
import { BiSearch } from 'react-icons/bi'
const User = dynamic(() => import('./user-circle'), {
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
            {/* <SearchBar /> */}
            <div className="flex items-center h-full gap-4 w-fit">
                <Link href='/search' className='w-9 h-9 rounded-full flex items-center justify-center border'><BiSearch size={20} /></Link>
                <ProjectsGrid />
                <User />
            </div>
        </div>
    )
}

export default Header