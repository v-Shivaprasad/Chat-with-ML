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
    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return "not found";
  }
};

export const chatSaver= async (FormData) => {
  try {
    console.log(FormData);
    const result = await fetch("http://localhost:3000/api/users/saveChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    const data = await result.json();
    console.log(data);
    return data;
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
    const data = await res.json();
    localStorage.setItem("sessionId",data.sessionId)
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const Chatsaver = async () => {};

export const getLLMResponse = async (text) => {
  try {
    const response = await fetch(
      "https://6a59-35-247-172-122.ngrok-free.app/predict",
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