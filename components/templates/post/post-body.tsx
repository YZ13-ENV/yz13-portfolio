import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostBody = ({ children }: Props) => {
    return (
        <div className="template-post-body">
            { children }
        </div>
    )
}

export default PostBody