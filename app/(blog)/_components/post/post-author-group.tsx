import PostAuthorClient from "./post-author-client"
import PostAuthorServer from "./post-author-server"

type Props = {
    authors: string[]
    max?: number
    asClient?: boolean
}
const GroupPostAuthors = ({ authors, max = 3, asClient = false }: Props) => {
    const limited = authors.filter((_, index) => max === 0 ? _ : index < max)
    return (
        <div className="w-full flex lg:flex-col flex-row lg:!items-start items-center gap-2 overflow-x-auto">
            {
                limited.map(uid => {
                    if (asClient) return <PostAuthorClient key={uid} uid={uid} />
                    return <PostAuthorServer key={uid} uid={uid} />
                })
            }
        </div>
    )
}

export default GroupPostAuthors