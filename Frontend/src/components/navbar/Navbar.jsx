import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { GiScaleMail } from "react-icons/gi";
import { Box, Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { MdEmail, MdNotifications } from "react-icons/md";
import {Link} from "react-router-dom"
import NavPopUp from "./NavPopUp";

function Navbar() {
  let [popUp, setPopUp] = useState(false);

  return (
    <Box boxShadow='md' p='3' rounded='md' bg='white' className="relative px-6 flex items-center justify-between">
      <div>
        <Link to={'/'}>
          <GiScaleMail  className="text-pink-500 text-[50px] text-center" />
        </Link>
      </div>
      <div className="flex gap-3">
      <Input placeholder='Search for t-shirt...' size='md' width={'450px'} className="font-semibold" />
      <Button colorScheme='pink' leftIcon={<RiSearch2Line />}>Search</Button>
      </div>
      <div className="flex gap-4 items-center justify-center cursor-pointer">
        <MdEmail className="text-pink-500 text-[25px] cursor-pointer" />
        <MdNotifications className="text-pink-500 text-[25px] cursor-pointer" />
        <img 
        onClick={()=> setPopUp(!popUp)}
        className="w-[50px] h-[50px] rounded-full object-cover "
        src="data:image/jpeg;base64,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"
        alt="profile image" />
      </div>
      {popUp && <NavPopUp className={'absolute  bottom-[-160%] right-[25px]'} />}
    </Box >
  );
}

export default Navbar;
