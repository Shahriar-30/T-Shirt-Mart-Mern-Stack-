import React, { useEffect, useState } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { RiTShirtLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const LogInPage = () => {
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [emailErr, setEmailErr] = useState("");
  let [passwordErr, setPasswordErr] = useState("");

  let [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    return () => {
      if (user) {
        let decoded = jwtDecode(user);
        if (!decoded.emailVerify) {
          navigate("/emailVerify");
        } else {
          navigate("/");
        }
      }
    };
  }, []);

  let submitForm = async () => {
    if (!email) {
      setEmailErr("Need Input!");
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailErr("Enter Valid E-mail");
    }

    if (!password) {
      setPasswordErr("Need Input!");
    } else if (password.length < 4) {
      setPasswordErr("Make a strong password!");
    }

    if (email && password && !emailErr && !passwordErr) {
      setBtnLoad(true);
      try {
        let { data } = await axios.post(
          "http://localhost:4040/api/v1/user/login",
          { email, password }
        );
        console.log(data)
        // if(data.errorStatus){
        //   toast.error(`${data.msg}😑`, {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     });
        //   }else{
        //   toast.success(`${data.msg}🤩`, {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     });
        // }
      } catch (err) {
        console.log("err", err);
        toast.error('Something Went Wrong💀', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      } finally {
        setBtnLoad(false);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="bg-[#eee] h-screen w-full flex items-center justify-center">
        <h1 className="absolute top-[1%]  text-[25px]">LogIn To Account!!😅</h1>
        <Link
          to="/register"
          className="absolute bottom-[7%] right-[5%] text-blue-500 text-[20px]"
        >
          Create An Account!!😎
        </Link>
        <div className="bg-white w-[360px] py-3 px-4 rounded-2xl space-y-2 shadow-2xl shadow-pink-500/20">
          <div className="w-full flex items-center justify-center">
            <RiTShirtLine className="text-pink-500 text-[50px] text-center" />
          </div>
          {/* emali */}
          <FormControl isInvalid={emailErr}>
            <FormLabel>
              <i className="text-bold text-[20px]">Email</i>
            </FormLabel>
            <Input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr("");
              }}
              value={email}
              className="font-semibold"
            />
            <FormErrorMessage>{emailErr}</FormErrorMessage>
          </FormControl>
          {/* password */}
          <FormControl isInvalid={passwordErr}>
            <FormLabel>
              <i className="text-bold text-[20px]">Password</i>
            </FormLabel>
            <Input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErr("");
              }}
              value={password}
              className="font-semibold"
            />
            <FormErrorMessage>{passwordErr}</FormErrorMessage>
          </FormControl>
          {/* end */}
          <div className="text-right">
            <Button
              size="lg"
              height="48px"
              width="200px"
              border="2px"
              isLoading={btnLoad}
              loadingText="Submitting"
              borderColor="pink.500"
              colorScheme="pink"
              onClick={submitForm}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
