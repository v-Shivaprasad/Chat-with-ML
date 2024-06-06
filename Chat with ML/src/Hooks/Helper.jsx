export const signupwithemailandPassword = async ({ FormData }) => {
  try {
    const result = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
