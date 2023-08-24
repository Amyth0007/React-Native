import { View, Text } from 'react-native'
import React from 'react'
import Home from '../Home'
import { Data} from 'iconsax-react'
import Dashboard from '../Dashboard'
import UserProfile from '../UserProfile'
import { Home3, Profile2User, Profile, Data2, AddSquare } from 'iconsax-react-native'
import AddUser from '../AddUser'

const BottamTablist = [
  {
    id: 101,
    name: "Home",
    component: Home,
    ic: <Home3 size="39" color="#FF8A65"/>,
  },
  {
    id: 32,
    name: "AddUser",
    component: AddUser,
    ic: <AddSquare
    size="32"
    color="#ba68c8"
    variant="Outline"
   />
  },
  {
    id: 298,
    name: "Dashboard",
    component: Dashboard,
    ic: <Data2 size="39" color="#FF8A65"/>,
  },
  {
    id: 312,
    name: "Profile",
    component: UserProfile,
    ic: <Profile size="39" color="#FF8A65"/>,
  },
  
]
const static_data = {
  BottamTablist
}
export default BottamTablist;