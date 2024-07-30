import { login } from "../features/authSlice";
import { AppDispatch } from "../store";

export const createUser = async (
  name: string,
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch("http://localhost:3001/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const authUserID = await response.json();

    if (authUserID) {
      const userResponse = await fetch(
        `http://localhost:3001/user/user/${authUserID}`
      );
      const user = await userResponse.json();

      dispatch(
        login({
          id: user.id,
          email: user.email,
          name: user.name,
        })
      );
    }
  } catch (error) {
    console.error("Failed to authenticate:", error);
  }
};
