import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostContent = ({ children }: Props) => {
    return (
        <div className="w-3/4 lg:border-r px-6 py-6 border-0">
            { children }
        </div>
    )
}

export default PostContent