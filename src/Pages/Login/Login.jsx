import React, { useEffect } from "react";
import { loginSchema } from "./LoginSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import controller from "./controller";
import LoginRedirect from "../../Routes/LoginRedirect";

const Login = () => {
  const { onLogin } = controller();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="mb-[50px] font-bold text-[24px]">Welcome To Admin Panel</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (value, { resetForm }) => {
          await onLogin(value);
          resetForm();
        }}
      >
        <Form className="w-[250px] lg:w-[500px]">
          <div className="mb-[15px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-[18px]">
              E-mail
            </label>
            <Field
              name="email"
              className="border-2 outline-amber-500 border-gray-200  text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            <div className="text-red-500 text-sm mt-[5px] text-[16px]">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="mb-[15px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-[18px]">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="border-2 ring-inherit ring-offset-0 ring-offset-inherit outline-amber-500 border-gray-200 focus:border-amber-500 focus:shadow-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            <div className="text-red-500 text-sm mt-[5px] text-[16px]">
              <ErrorMessage name="password" />
            </div>
          </div>
          <div className="mb-[20px] mt-[40px]">
            <button
              type="submit"
              className="duration-300  disabled:bg-slate-300 disabled:border-slate-300 disabled:cursor-not-allowed inline-flex items-center justify-center w-full bg-amber-500 hover:bg-amber-400 text-white py-2 px-4 border text-[18px] hover:text-black border-amber-500 rounded"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginRedirect(Login);
