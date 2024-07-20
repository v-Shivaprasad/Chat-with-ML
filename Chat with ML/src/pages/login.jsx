import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../store/ThemeManage";
import Navbar from "../components/Navbar";
import { loginwithemailandPassword } from "../Hooks/Helper";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dark } = useDarkTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginwithemailandPassword(formData);
      if (user.ok) {
        localStorage.setItem("token", user.token);
        navigate("/", { state: { loginSuccess: true } }); // Pass loginSuccess state
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
      <div className={`flex justify-center items-center h-screen bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]`}>
        <Card color="transparent" shadow={true} className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
          <Typography variant="h4" color="blue-gray-700" className="text-center mb-4 gradient__text">
            Login To Your Account
          </Typography>
          <Typography color="blue-gray-500" className="text-center mb-6">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              "Please fill in the details below to login."
            )}
          </Typography>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex flex-col gap-2">
                <Typography variant="h6" color="blue-gray-600">
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
                <Typography variant="h6" color="blue-gray-600">
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
            <Button type="submit" color="blue" className="w-full bg-gradient-to-r from-gradient_textto-gradient_texthover:from-blue-700 hover:to-blue-900 text-white">
              Login
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
