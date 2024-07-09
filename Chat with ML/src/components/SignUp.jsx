import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../store/ThemeManage";
import { signupwithemailandPassword } from "../Hooks/Helper";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(formData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dark } = useDarkTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log(formData);
    const user  =   await signupwithemailandPassword(
        formData
      );
    console.log(user);
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
          Create an Account
        </Typography>
        <Typography color="gray" className="mt-1 font-normal dark:text-white">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            "Please fill in the details below to create an account."
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
          <div className="mb-4">
            <div className="flex flex-col gap-2">
              <Typography variant="h6" color="blue-gray">
                Confirm Password
              </Typography>
              <Input
                size="lg"
                placeholder="Confirm your password"
                className="input_field"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" color="blue">
            Sign Up
          </Button>
        </form>
        <Button
          size="lg"
          variant={!dark ? "outlined" : "filled"}
          color={!dark ? "blue-gray" : "white"}
          className="flex items-center gap-3 mt-4"
          onClick={() => console.log("Google Sign In")} // Replace with actual Google Sign-In handler
        >
          <img
            src="https://docs.material-tailwind.com/icons/google.svg"
            alt="google"
            className="h-6 w-6"
          />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
};

export default SignUp;
