import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostContent = ({ children }: Props) => {
    return (
        <div className="template-post-content">
            { children }
        </div>
    )
}

export default PostContent