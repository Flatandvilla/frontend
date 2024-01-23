import { MdOutlineSpaceDashboard }from 'react-icons/md'
import { BiBell, BiMessageDetail } from 'react-icons/bi'
import { AiOutlineBarChart } from 'react-icons/ai'

import { HiOutlineCog8Tooth } from 'react-icons/hi2'
import { TbFileInvoice } from 'react-icons/tb'
import { BsCalendar2Check, BsCalendarDate } from 'react-icons/bs'
import {FiUserCheck} from 'react-icons/fi'
import { TbDeviceAnalytics } from "react-icons/tb";

export const sidebarLinks = [
  {
    id:1,
    name:'Rank Tracking',
    path:'/',
    icon: <TbDeviceAnalytics />

  },
  {
    id:2,
    name:'keyword Research',
    path:'/search',
    icon: <AiOutlineBarChart />
  },
  // {
  //   id:3,
  //   name:'Invoice',
  //   path:'/invoice',
  //   icon: <TbFileInvoice />
  // },
  // {
  //   id:4,
  //   name:'Schedule',
  //   path:'/schedule',
  //   icon: <BsCalendarDate />
  // },
  // {
  //   id:5,
  //   name:'Calender',
  //   path:'/calender',
  //   icon: <BsCalendar2Check />
  // },
  // {
  //   id:6,
  //   name:'Messages',
  //   path:'/messages',
  //   icon: <BiMessageDetail/>
  // },
  // {
  //   id:7,
  //   name:'Notifcation',
  //   path:'/notifcation',
  //   icon: <BiBell />
  // },
  {
    id:8,
    name:'Settings',
    path:'/settings',
    icon: <HiOutlineCog8Tooth />
  },
  {
    id:9,
    name:'Account',
    path:'/account',
    icon: <FiUserCheck />
  },

]






