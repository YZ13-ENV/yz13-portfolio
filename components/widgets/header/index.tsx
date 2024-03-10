import YZ13MarkSkeleton from '@/components/skeletons/YZ13-mark'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const UserSection = dynamic(() => import('./user-section'), {
    ssr: false,
    loading: () => <div className='w-fit h-fit flex items-center gap-2'>
        <div className='w-9 rounded-full bg-muted animate-pulse' />
        <div className='w-9 rounded-full bg-muted animate-pulse' />
        <div className='w-9 rounded-full bg-muted animate-pulse' />
        <div className='w-9 rounded-full bg-muted animate-pulse' />
    </div>
})

const YZ13Mark = dynamic(() => import('../../shared/yz13-mark'), {
    loading: () => <YZ13MarkSkeleton />
})

const Header = () => {
    return (
        <div className='flex items-center justify-between gap-4 w-full h-full'>
            <Link href='/'><YZ13Mark /></Link>
            <UserSection />
        </div>
    )
}

export default Header