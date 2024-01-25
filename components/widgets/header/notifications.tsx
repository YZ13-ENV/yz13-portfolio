'use client'
import { Notifications } from 'ui'
import { auth } from '@/utils/app'
import { memo } from 'react'


const NotificationsWrapper = () => {
    return <Notifications auth={auth} />
}

export default memo(NotificationsWrapper)