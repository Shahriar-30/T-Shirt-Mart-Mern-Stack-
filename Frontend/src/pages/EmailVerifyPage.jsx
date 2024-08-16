import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RiTShirtLine } from "react-icons/ri";

function EmailVerifyPage() {
  let [loading, setLoading ] = useState(false);
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let [admin, setAdmin] = useState({});

  useEffect(() => {
    return async () => {
      if (user) {
        
        const decoded = jwtDecode(user);
        setAdmin(decoded);
        try {
          let value = localStorage.getItem("email");
          if (!value) {
            setLoading(true);
            await axios.post(
              "http://localhost:4040/api/v1/user/account/verify/email/send",
              {
                email: decoded.email,
                id: decoded.id,
              }
            );
            toast.success("E-Mail Sended", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            localStorage.setItem("email", "true");
          }
        } catch (err) {
          toast.error("can't send E-Mail", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(err)
        }finally{
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };
  }, []);

  if (admin.emailVerify) {
    return (
      <>
       <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <div className="h-screen w-full grid place-items-center">
        <div className="w-[70%] h-[300px] shadow-2xl shadow-pink-500/20 rounded-lg bg-slate-200 flex gap-2 flex-col items-center justify-center">
      <RiTShirtLine className="text-pink-500 text-[50px] text-center" />
          <h2 className="text-[25px] font-semibold">
            Verification E-mail Completed
          </h2>
          <p>your are good to go!!</p>
          <Button colorScheme="pink">
            <Link to={"/"}>Go To Dashboard🙂</Link>
          </Button>
        </div>
      </div>
    </>
    );
  } else {
    return (
      <>
       <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <div className="h-screen w-full grid place-items-center">
       
        <div className="w-[70%] h-[300px] shadow-2xl shadow-pink-500/20 rounded-lg bg-slate-200 flex gap-2 flex-col items-center justify-center">
      <RiTShirtLine className="text-pink-500 text-[50px] text-center" />
          <h2 className="text-[25px] font-semibold">
            Verification E-mail Sended
          </h2>
          <p>{admin.email}</p>
          <Button
           isLoading={loading}
            colorScheme="blue"
            onClick={async () => {
                const decoded = jwtDecode(user);
                setLoading(true);
              try {
                await axios.post(
                  "http://localhost:4040/api/v1/user/account/verify/email/send",
                  {
                    email: decoded.email,
                    id: decoded.id,
                  }
                );
                toast.success("E-Mail Sended", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                localStorage.setItem("email", "true");
              } catch (err) {
                toast.error("can't send E-Mail", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                console.log(err)
              }finally{
                setLoading(false);
              }
            }}
          >
            Send E-mail Again 🙂
          </Button>
        </div>
      </div>
      </>
    );
  }
}
export default EmailVerifyPage;
