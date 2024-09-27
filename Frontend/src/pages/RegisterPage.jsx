import React, { useState, useEffect } from "react";
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
import { setUser } from "../tools/Slice/UserSlice/UserSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let [fiName, setFiName] = useState("");
  let [lsName, setLsName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [fiNameErr, setFiNameErr] = useState("");
  let [emailErr, setEmailErr] = useState("");
  let [passwordErr, setPasswordErr] = useState("");

  let [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    if (user) {
      const decoded = jwtDecode(user);

      if (!decoded.emailVerify) {
        navigate("/emailverify");
      } else {
        navigate("/");
      }
    }
  }, []);

  let submitForm = async () => {
    if (!fiName) {
      setFiNameErr("Need Input!");
    }
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

    if (
      fiName &&
      email &&
      password &&
      !fiNameErr &&
      !emailErr &&
      !passwordErr
    ) {
      setBtnLoad(true);
      try {
        let data = await axios.post(
          "http://localhost:4040/api/v1/user/register",
          {
            firstName: fiName,
            lastName: lsName,
            email,
            password,
          }
        );
        // data.data.msg
        toast.success(data.data.msg, {
          duration: 4000,
          position: "top-center",
        });
        dispatch(setUser(data.data.user));
        setTimeout(() => {
          navigate("/emailVerify");
        }, 2000);
      } catch (err) {
        // err.response?.data?.msg
        toast.error(err.response?.data?.msg, {
          duration: 4000,
          position: "top-center",
        })
        if (err.response?.data?.msg == "Email already exists.") {
          setEmailErr("Email already exists.");
        }
        console.log(err);
      } finally {
        setBtnLoad(false);
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-[#eee] h-screen w-full flex items-center justify-center">
        <h1 className="absolute top-[1%]  text-[25px]">
          Create An Account!!😎
        </h1>
        <Link
          to="/login"
          className="absolute bottom-[5%] right-[5%] text-blue-500 text-[20px]"
        >
          LogIn To Account!!😅
        </Link>
        <div className="bg-white w-[360px] py-3 px-4 rounded-2xl space-y-2 shadow-2xl shadow-pink-500/20">
          <div className="w-full flex items-center justify-center">
            <RiTShirtLine className="text-pink-500 text-[50px] text-center" />
          </div>
          {/* first name */}
          <FormControl isInvalid={fiNameErr}>
            <FormLabel>
              <i className="text-bold text-[20px]">First Name</i>
            </FormLabel>
            <Input
              type="text"
              onChange={(e) => {
                setFiName(e.target.value);
                setFiNameErr("");
              }}
              value={fiName}
              className="font-semibold"
            />
            <FormErrorMessage>{fiNameErr}</FormErrorMessage>
          </FormControl>
          {/* last Name */}
          <FormControl>
            <FormLabel>
              <i className="text-bold text-[20px]">Last Name</i>
            </FormLabel>
            <Input
              type="text"
              onChange={(e) => setLsName(e.target.value)}
              value={lsName}
              className="font-semibold"
            />
          </FormControl>
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

export default RegisterPage;
