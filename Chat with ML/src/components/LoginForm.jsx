import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { loginwithemailandPassword } from "../Hooks/Helper";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../store/ThemeManage";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dark } = useDarkTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginwithemailandPassword(
       formData
      );
      if (user.ok) {
        console.table(user);
        localStorage.setItem(user.token);
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
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login To Your Account
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            "Please fill in the details below to login."
          )}
        </Typography>
        <form className="form_tw" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <Typography variant="h6" color="blue-gray">
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
              <Typography variant="h6" color="blue-gray">
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
          <Button type="submit" color="blue">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
