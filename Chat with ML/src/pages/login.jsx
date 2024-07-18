// import React, { useState } from "react";
// import { Card, Input, Button, Typography } from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
// import { useDarkTheme } from "../store/ThemeManage";
// import Navbar from "../components/Navbar";

// // Mock login function for demonstration
// const loginwithemailandPassword = async ({ email, password }) => {
//   // Simulate a login request with a delay
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (email === "test@example.com" && password === "password") {
//         resolve({ ok: true, token: "fake-jwt-token" });
//       } else {
//         reject(new Error("Invalid email or password"));
//       }
//     }, 1000);
//   });
// };

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { dark } = useDarkTheme();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await loginwithemailandPassword(formData);
//       if (user.ok) {
//         localStorage.setItem("token", user.token);
//         navigate("/");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={`flex justify-center items-center h-screen bg-gradient-to-tr from-[#030715F0] via-[#030715ED] to-[#010A30]`}>
//         <Card color="transparent" shadow={true} className="p-8 bg-white rounded-lg shadow-lg max-w-sm w-full">
//           <Typography variant="h4" color="blue-gray-700" className="text-center mb-4 gradient__text">
//             Login To Your Account
//           </Typography>
//           <Typography color="blue-gray-500" className="text-center mb-6">
//             {error ? (
//               <p className="text-red-500">{error}</p>
//             ) : (
//               "Please fill in the details below to login."
//             )}
//           </Typography>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <div className="flex flex-col gap-2">
//                 <Typography variant="h6" color="blue-gray-600">
//                   Email
//                 </Typography>
//                 <Input
//                   size="lg"
//                   placeholder="Enter your email"
//                   className="input_field"
//                   labelProps={{
//                     className: "before:content-none after:content-none",
//                   }}
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <div className="flex flex-col gap-2">
//                 <Typography variant="h6" color="blue-gray-600">
//                   Password
//                 </Typography>
//                 <Input
//                   size="lg"
//                   placeholder="Enter your password"
//                   className="input_field"
//                   labelProps={{
//                     className: "before:content-none after:content-none",
//                   }}
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <Button type="submit" color="blue" className="w-full bg-gradient-to-r from-gradient__textto-gradient__texthover:from-blue-700 hover:to-blue-900 text-white">
//               Login
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../store/ThemeManage";
import Navbar from "../components/Navbar";

// Mock login function for demonstration
const loginwithemailandPassword = async ({ email, password }) => {
  // Simulate a login request with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        resolve({ ok: true, token: "fake-jwt-token" });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
  const navigate = useNavigate();
  const { dark } = useDarkTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginwithemailandPassword(formData);
      if (user.ok) {
        localStorage.setItem("token", user.token);
        setLoginSuccess(true); // Set login success state to true
        setTimeout(() => setLoginSuccess(false), 3000); // Clear success message after 3 seconds
        navigate("/");
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
            <Button type="submit" color="blue" className="w-full bg-gradient-to-r from-gradient__textto-gradient__texthover:from-blue-700 hover:to-blue-900 text-white">
              Login
            </Button>
          </form>
        </Card>
      </div>
      {loginSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-center">Login Successful!</p>
        </div>
      )}
    </>
  );
};

export default Login;

