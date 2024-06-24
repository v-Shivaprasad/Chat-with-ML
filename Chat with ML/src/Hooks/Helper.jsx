export const signupwithemailandPassword = async (FormData) => {
  try {
    console.log(FormData);
    const result = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return "not found";
  }
};

export const loginwithemailandPassword = async (FormData) => {
  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const Chatsaver = async () => {};

export const getLLMResponse = async (text) => {
  try {
    const response = await fetch(
      "https://5726-104-198-108-43.ngrok-free.app/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data.prediction;
  } catch (error) {
    console.log(error);
  }
};
