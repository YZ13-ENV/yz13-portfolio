'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories, getCategoryName } from "@/const/categories"
import { Categories } from "@/types/common"
import { motion } from 'framer-motion'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const CategoryTabs = () => {
    const path = usePathname()
    const selectedTab = useMemo(() => {
        if (path === '/') return 'all'
        const shortPath = path.replace('/blog/category/', '')
        return shortPath
    }, [path])
    return (
        <Tabs>
            <TabsList className="!bg-transparent !p-0 h-fit rounded-none">
                {
                    categories
                        .map(category => {
                            const href = category === 'all' ? '/' : `/blog/category/${category}`
                            const isSelected = selectedTab === category
                            return (
                                <TabsTrigger asChild value={category} key={'tab-' + category}
                                    className="relative h-full border-0">
                                    <Link href={href} className="relative">
                                        <span className={`z-10 ${isSelected ? 'text-accent-foreground' : 'text-muted-foreground hover:text-secondary-foreground'}`}>
                                            {getCategoryName(category as keyof Categories)}
                                        </span>
                                        {
                                            isSelected &&
                                            <motion.div layoutId="category-tab"
                                                className="w-full h-0.5 rounded-md bg-primary absolute left-0 -bottom-2" />
                                        }
                                    </Link>
                                </TabsTrigger>
                            )
                        })
                }
            </TabsList>
        </Tabs>
    )
}

export default CategoryTabs