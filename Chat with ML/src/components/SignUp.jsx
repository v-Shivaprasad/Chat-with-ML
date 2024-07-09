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
      const user = await signupwithemailandPassword(formData);
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <Typography variant="h4" className="text-center mb-4 text-bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 font-bold">
          Create an Account
        </Typography>
        {error && (
          <Typography className="text-center mb-4 text-red-500">
            {error}
          </Typography>
        )}
        <Typography className="text-center mb-4 text-red-500">
          Please fill in the details below to create an account.
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Typography variant="h6" className="text-gray-700">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
              className="w-full mt-2"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Typography variant="h6" className="text-gray-700">
              Password
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your password"
              className="w-full mt-2"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Typography variant="h6" className="text-gray-700">
              Confirm Password
            </Typography>
            <Input
              size="lg"
              placeholder="Confirm your password"
              className="w-full mt-2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button type="submit" color="drek blue" className="w-full py-2 text-white">
            Sign Up
          </Button>
        </form>
        <Button
          size="lg"
          variant="outlined"
          color="dark blue"
          className="flex items-center gap-3 mt-6 w-full py-2"
          onClick={() => console.log("Google Sign In")}
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

