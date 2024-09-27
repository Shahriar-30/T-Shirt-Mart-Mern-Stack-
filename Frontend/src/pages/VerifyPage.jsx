import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setUser } from "../tools/Slice/UserSlice/UserSlice";

function VerifyPage() {
  const { id } = useParams();

  let user = useSelector((state) => state.user);
  let [admin, setAdmin] = useState({});
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect( () => {
    return async ()=> {
      try {
        if (user) {
          const decoded = jwtDecode(user);
          setAdmin(decoded);
    
            await axios.patch(
              `http://localhost:4040/api/v1/user/account/verify/${id}`,
              {
                id: id,
              }
            );
            let updateUser = await axios.get(`http://localhost:4040/api/v1/user/userbyid/${id}`)
            localStorage.setItem("info", updateUser.data.user)
            console.log(updateUser)
            dispatch(setUser(updateUser.data.user))
            navigate("/emailVerify");
          
        } else {
          navigate("/login");
        }
        
      } catch (err) {
        console.log(err)
      }
    }
  }, []);

  return <div>Loading...</div>;
}

export default VerifyPage;
