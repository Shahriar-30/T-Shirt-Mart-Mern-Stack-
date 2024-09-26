import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LeftBar from "../../components/dashbord/LeftBar";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function DashBordPage() {
  let demo = [
    {
      id: 1,
      email: "alsih@fkd.com",
      name: "jone deo",
    },
  ];

  let navigate = useNavigate();
  let userToken = useSelector((state) => state.user);
  let user = jwtDecode(userToken);

  useEffect(() => {
    if (user.userType == "buyer") {
      // navigate("/")
    }
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <LeftBar />
        </div>
        <div className="p-3">
          <div className="flex gap-4">
            <p className="text-sm">Total User:</p>
            <p className="text-lg">24</p>
          </div>
          <div>
            <Input placeholder="Search By Gamil" width={"500px"} />
            {demo && (
              <div className="w-[500px] bg-[#eee] rounded-md mt-1 p-3">
                {demo.map((e) => (
                  <div key={e.id} className="flex justify-between border-b-2">
                    <div className="text-[18px] text-semibold">
                      <p>{e.email}</p>
                      <p>{e.name}</p>
                    </div>
                    <div>
                      <ButtonGroup gap="4">
                        <Button colorScheme='red'>Delete</Button>
                        <Button colorScheme="blackAlpha">Block</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBordPage;
