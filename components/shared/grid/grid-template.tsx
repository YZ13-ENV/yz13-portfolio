// import React from 'react'
import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const GridTemplate = ({ children }: Props) => {
    return (
        <div className='last-posts-grid'>
            { children }
        </div>
    )
}

export default GridTemplate