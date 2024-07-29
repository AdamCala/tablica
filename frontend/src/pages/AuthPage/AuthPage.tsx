import { useState } from "react";
import styles from "../../styles/pages/_auth-page.module.scss";

const AuthPage = () => {
  const handleFormSubmit = () => {};
  const [AuthType, SetAuthType] = useState<"login" | "sign-up">("login");
  const handleAuthType = () => {
    SetAuthType((prevAuthType) =>
      prevAuthType === "login" ? "sign-up" : "login"
    );
    console.log(AuthType);
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleFormSubmit}>
        {AuthType == "login" ? (
          <>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
          </>
        ) : (
          <>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="confirm-email">Confirm Email</label>
            <input type="email" name="confirm-email" id="confirm-email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
            />
            <button type="submit">Login</button>
          </>
        )}
      </form>
      {AuthType == "login" ? (
        <>
          <button onClick={handleAuthType}>Create an account</button>
        </>
      ) : (
        <>
          <button onClick={handleAuthType}>Login into existing account</button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
