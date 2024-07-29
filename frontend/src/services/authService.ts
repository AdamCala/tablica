import { login } from "../features/authSlice";
import { AppDispatch } from "../store";

export const checkAuth = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    const response = await fetch("http://localhost:3001/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const isAuthenticated = await response.json();

    if (isAuthenticated) {
      const userResponse = await fetch(
        `http://localhost:3001/user/user/${email}`
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
