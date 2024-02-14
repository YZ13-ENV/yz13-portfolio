import Link from "next/link"
import NotificationsWrapper from './notifications'
import { ProjectsGrid } from "ui"
import User from "./user-circle"
import { BiSearch } from "react-icons/bi"
const UserSection = () => {
  return (
    <div className="flex items-center h-full gap-2 w-fit">
      <Link href='/search' className='w-9 h-9 rounded-full flex items-center justify-center border'><BiSearch size={20} /></Link>
      <NotificationsWrapper />
      <ProjectsGrid />
      <User />
    </div>
  )
}

export default UserSection