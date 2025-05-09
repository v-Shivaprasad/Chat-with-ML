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

export const chatSaver = async (chatData) => {
  const response = await fetch("http://localhost:3000/api/users/saveChat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chatData.token}`,
    },
    body: JSON.stringify({
      title: chatData.title,
      messages: chatData.messages,
      chatId: chatData.chatId,
      token:chatData.token,
    }),
  });
  return await response.json();
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


// export const getLLMResponse = async (text) => {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/getRespo", // Replace with your backend server URL
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ data: text }),
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     return data.prediction;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getLLMResponse = async (text) => {
  try {
      const response = await fetch(
          "http://localhost:3000/api/getRespo", // Replace with your actual backend URL
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: text }),
          }
      );

      if (!response.ok) {
          // Handle HTTP errors (e.g., 404, 500)
          const errorData = await response.json(); //try to get error object from backend.
          if(errorData && errorData.msg){
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.msg}`);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

      }

      const data = await response.json();
      console.log("LLM Response Data:", data);

      if (data.image) {
          // If the response includes an image URL
          return {
              text: data.prediction,
              image: data.image,
          };
      } else {
          // If the response only includes the prediction text
          return data.prediction;
      }
  } catch (error) {
      console.error("Error fetching LLM response:", error);
      return "Failed to get response. Please try again later."; // User-friendly error message
  }
};



export const fetchChatHistory = async (sessionId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/getChatHistory/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }

    const data = await response.json();
    console.log(data); // Logging the fetched data for debugging

    return data; // Returning the parsed JSON data
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
    throw error; // Re-throw the error for handling in the calling function
  }
};
