import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Textarea } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import LeftBar from "../../components/dashbord/LeftBar";
import { Button } from '@chakra-ui/react'

function ItemPage() {
  let userToken = useSelector((state) => state.user);
  let user = jwtDecode(userToken);

  return (
    <div className="flex">
      <div>
        <LeftBar />
      </div>
      <div className="p-4 space-y-2">
        <Input type="file" />
        <Input placeholder="Item Title" />
        <Textarea placeholder='Item Description' />
        <Button colorScheme='blue'>Create Item</Button>
      </div>
    </div>
  );
}

export default ItemPage;
