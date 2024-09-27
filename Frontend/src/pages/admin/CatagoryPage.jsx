import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import LeftBar from "../../components/dashbord/LeftBar";

export const CatagoryPage = () => {
  let demo = [
    {
      id: 0,
      name: "t-shirt",
    },
  ];
  let userToken = useSelector((state) => state.user);
  let user = jwtDecode(userToken);

  useEffect(() => {
    if (user.userType == "buyer") {
      // navigate("/")
    }
  }, []);

  return (
    <div className="flex">
      <div>
        <LeftBar />
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <Input placeholder="New Catagory Name" width={"500px"} />
          <Button colorScheme="blue">Create</Button>
        </div>
        <h4 className="text-[25px] text-bold m-3">All Catagory</h4>
        <div>
          {demo.map((e) => (
            <div key={e.id} className="flex bg-[#eee] justify-between border-b-2 p-3">
              <div className="text-[20px] text-bold">
                <p>{e.name}</p>
              </div>
              <div>
                <ButtonGroup gap="4">
                  <Button colorScheme="red" >Delete</Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
