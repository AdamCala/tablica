import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import styles from "../../styles/layout/_navbar-component.module.scss";
import { logout } from "../../features/authSlice";

const NavbarComponent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGuestClick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const handleLoggedClick = () => {
    if (user) {
      dispatch(logout());
    }
  };
  return (
    <>
      <div className={styles.main}>
        <h1>Tablica</h1>
        {user ? (
          <div>
            <p onClick={handleLoggedClick}>Logout</p>
          </div>
        ) : (
          <div>
            <p onClick={handleGuestClick}>Nie</p>
          </div>
        )}
      </div>
      <div className={styles.line} />
    </>
  );
};

export default NavbarComponent;
