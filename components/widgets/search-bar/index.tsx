'use client'
import { Input } from '@/components/ui/input'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { useDebounceEffect } from 'ahooks'
import { useRouter } from 'next/navigation'

type Props = {
    providedQuery?: string
}
const SearchBar = ({ providedQuery }: Props) => {
    const [query, setQuery] = useState<string>(providedQuery ? providedQuery : '')
    const { push } = useRouter()
    useDebounceEffect(() => {
        if (query !== '') {
            push(`/search/${query}`)
        }
    },[query], { wait: 1000, maxWait: 2000 })
    return (
        <div className='w-full md:max-w-md max-w-full h-fit flex items-center gap-2 px-2 border rounded-md'>
            <BiSearch className='text-muted-foreground' />
            <Input value={query} onChange={e => setQuery(e.target.value)} 
            className="px-0 !border-0 !ring-0" placeholder="Поиск постов" />
        </div>
    )
}

export default SearchBar