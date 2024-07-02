import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { loginwithemailandPassword } from "../Hooks/Helper";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../store/ThemeManage";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dark } = useDarkTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginwithemailandPassword(formData);
      console.log(user);
      if (user.ok) {
        // console.table(user);
        localStorage.setItem('token',user.token);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen  pt-48 dark:bg-chatMsg">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="white">
          Login To Your Account
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            "Please fill in the details below to login."
          )}
        </Typography>
        <form className="form_tw" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <Typography variant="h6" color="blue-white">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your email"
                className="input_field"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <Typography variant="h6" color="white">
                Password
              </Typography>
              <Input
                size="lg"
                placeholder="Enter your password"
                className="input_field"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="submit" color="white">
            Login
          </Button>
        </form>
      </Card>
    </div>
    </>
  );
};

export default Login;

