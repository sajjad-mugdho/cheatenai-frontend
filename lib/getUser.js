import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get("/api/user/get-user");
    const user = response.data;

    console.log(user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};
