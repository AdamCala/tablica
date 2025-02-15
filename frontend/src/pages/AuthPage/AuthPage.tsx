import { useState } from "react";
import styles from "../../styles/pages/_auth-page.module.scss";
import buttonStyles from "../../styles/components/_button-component.module.scss";
import inputStyles from "../../styles/components/_input-component.module.scss";
import { AuthForm, authFormSchema } from "../../models/formModel";
import { checkAuth } from "../../services/authService";
import { useAppDispatch } from "../../hooks/storeHook";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../../services/createUser";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [authType, setAuthType] = useState<"login" | "sign-up">("login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const schema = authFormSchema(authType);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthForm>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: AuthForm) => {
    setLoading(true);
    setErrorMessage(null);
    if (authType === "sign-up") {
      try {
        if (data.name) {
          await createUser(data.name, data.email, data.password, dispatch);
          reset();
          setLoading(false);
          navigate("/");
        } else {
          throw new Error("Name is required for sign-up");
        }
      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message || "An unexpected error occurred");
        setLoading(false);
      }
    } else {
      try {
        await checkAuth(data.email, data.password, dispatch);
        reset();
        setLoading(false);
        navigate("/");
      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message || "An unexpected error occurred");
        setLoading(false);
      }
    }
  };

  const handleAuthType = () => {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "sign-up" : "login"
    );
    reset();
    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <form method="post" onSubmit={handleSubmit(handleFormSubmit)}>
        {authType === "login" ? (
          <>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    className={inputStyles.main}
                    {...field}
                    type="email"
                    id="email"
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <label htmlFor="password">Password</label>
                  <input
                    className={inputStyles.main}
                    {...field}
                    type="password"
                    id="password"
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </>
              )}
            />
            <button
              className={buttonStyles.main}
              type="submit"
              disabled={loading}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <label htmlFor="name">Name</label>
                  <input
                    className={inputStyles.main}
                    {...field}
                    type="text"
                    id="name"
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    className={inputStyles.main}
                    {...field}
                    type="email"
                    id="email"
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <label htmlFor="password">Password</label>
                  <input
                    className={inputStyles.main}
                    {...field}
                    type="password"
                    id="password"
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </>
              )}
            />
            <button
              className={buttonStyles.main}
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
          </>
        )}
      </form>
      {authType === "login" ? (
        <button className={buttonStyles.main} onClick={handleAuthType}>
          Create an account
        </button>
      ) : (
        <button className={buttonStyles.main} onClick={handleAuthType}>
          Login into existing account
        </button>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AuthPage;
