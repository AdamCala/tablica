import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import styles from "../../styles/layout/_navbar-component.module.scss";
import buttonStyles from "../../styles/components/_button-component.module.scss";
import { logout } from "../../features/authSlice";
import { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";

const NavbarComponent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
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
            <button
              className={buttonStyles.main}
              onClick={() => setIsOpen(true)}
            >
              Post
            </button>
            <button className={buttonStyles.main} onClick={handleLoggedClick}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button className={buttonStyles.main} onClick={handleGuestClick}>
              Login
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <ModalComponent onClose={() => setIsOpen(false)}>
          <div className={styles.modal}>test</div>
        </ModalComponent>
      )}
      <div className={styles.line} />
    </>
  );
};

export default NavbarComponent;
