import React from 'react'
import { Button } from '@chakra-ui/react'
import { RiUser2Fill } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'

function NavPopUp({className}) {
  return (
    <div className={className}>
        <div className=' bg-[#eee] w-[200px] p-2 rounded-md space-y-3' >
        <Button colorScheme='blue' rightIcon={<RiUser2Fill />} width={'full'}>Profile</Button>
        <Button colorScheme='red'  rightIcon={<MdLogout />} width={'full'}>Log Out</Button>
        </div>
    </div>
  )
}

export default NavPopUp