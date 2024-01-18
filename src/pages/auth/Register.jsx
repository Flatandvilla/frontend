import React from "react";
import RegistrationForm from "../../components/Register/Form";

const Register = () => {

  return (
    <div className=" flex items-center justify-center ">
      <div className=" w-full h-screen bg-lightgray  p-[30px] ">
        <RegistrationForm/>
      </div>
    </div>
  );
};

export default Register;
