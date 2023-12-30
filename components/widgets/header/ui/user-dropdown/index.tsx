'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import UserPreview from "./user-preview"
import Logout from "./logout"
import { User } from "firebase/auth"
import Link from "next/link"

type Props = {
    user: User
}
const UserDropdown = ({ user }: Props) => {
    if (!user) return null
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="rounded-full w-9 h-9">
                    <AvatarImage src={user.photoURL || undefined} alt="@shadcn" className="rounded-full" />
                    <AvatarFallback>{user.displayName ? user.displayName?.slice(0, 2) : 'UR'}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-60 rounded-xl">
                <UserPreview user={user} />
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href='/upload/post'>Опубликовать пост</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <Logout />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown