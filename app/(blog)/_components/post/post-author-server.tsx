import { user as userAPI } from "@/api/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    uid: string
    hideName?: boolean
    className?: string
}
const PostAuthor = async({ uid, hideName=false, className }: Props) => {
    const user = await userAPI.byId.short(uid)
    const position = user?.position
    if (!user) return null
    return (
      <div className="relative flex items-center gap-2 w-fit h-fit">
        <Avatar className={className ? className : "w-9 h-9"}>
          <AvatarImage src={user.photoUrl} alt={'@' + user.displayName} />
          <AvatarFallback>{user.displayName ? user.displayName?.slice(0, 2) : 'UR'}</AvatarFallback>
        </Avatar>
        {
          !hideName &&
          <div className="w-full h-full flex flex-col">
            <span className="text-base font-medium text-accent-foreground">{user.displayName}</span>
            <span className="text-sm text-muted-foreground">{position || user.email}</span>
          </div>
        }
    </div>
    )
}

export default PostAuthor