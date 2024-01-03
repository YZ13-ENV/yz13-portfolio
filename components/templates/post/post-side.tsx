import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostSide = ({ children }: Props) => {
    return (
        <div className="template-post-side">
            { children }
        </div>
    )
}

export default PostSide