// RegistrationForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registrationSchema } from "../../utils/validation";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const registrationData = {
        username: data.username, 
        email: data.email,
        password: data.password,
        password2: data.password2,
      };
      
  
      const response = await axios.post(`http://192.168.0.175:8002/api/register/`,
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Server response:', response.data);
    
      toast.success("Registration successful");
      navigate("/login");
      
    } catch (error) {
      toast.error("Registration failed");
      console.error("Error details:", error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="2xl:max-w-2xl md:max-w-lg w-full mx-auto shadow-custom bg-white
      flex flex-col p-[60px] rounded-lg mt-[80px]  "
    >
      <h2 className="text-center text-blue font-extrabold text-3xl tracking-[0.3rem]
      hover:translate-x-8 duration-300 ease-in-out mb-3">RankTracker</h2>
      <h3 className="font-bold  text-blue lg:text-3xl md:text-2xl text-lg  mt-3 ">Create an Account</h3>
      <p className="mb-3 text-md mt-4">Fill in the details below to create your account.</p>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          {...register("username")}
          className="border rounded-lg px-3 py-2 w-full md:text-lg text-md 
          focus:border-blue focus:ring-darkblue"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="text"
          placeholder="Enter your email address"
          {...register("email")}
          className="border rounded-lg px-3 py-2 w-full md:text-lg text-md 
          focus:border-blue focus:ring-darkblue"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          placeholder="Enter your password"
          type="password"
          {...register("password")}
          className="border rounded-lg px-3 py-2 w-full md:text-lg text-md 
          focus:border-blue focus:ring-darkblue"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password:
        </label>
        <input
          placeholder="Re-enter your password"
          type="password"
          {...register("password2")}
          className="border rounded-lg px-3 py-2 w-full md:text-lg text-md 
          focus:border-blue focus:ring-darkblue"
        />
        {errors.password2 && (
          <p className="text-red-500 text-xs mt-1">{errors.password2.message}</p>
        )}
      </div>

      <button
        type="submit"
        className={`bg-blue text-white font-bold mt-5
         py-2 px-4 rounded `}
      >
        Create Account
      </button>
      <div className="mb-4 text-center">
  <p className="text-md mt-4">
    
     Already have an account {" "}? 
    <span className="text-blue cursor-pointer">
      <Link to="/login"> Login In </Link>
    </span>
  </p>
</div>
    </form>
  );
};

export default RegistrationForm;
