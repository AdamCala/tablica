import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import styles from "../../styles/layout/_navbar-component.module.scss";
import inputStyles from "../../styles/components/_input-component.module.scss";
import buttonStyles from "../../styles/components/_button-component.module.scss";
import { logout } from "../../features/authSlice";
import { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import { PostModel, postSchema } from "../../models/postModel";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendPost } from "../../services/uploadService";

interface NavbarComponentProps {
  onPostClick: () => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onPostClick }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [loading, setLoading] = useState(false);

  const schema = postSchema();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostModel>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: PostModel) => {
    setLoading(true);
    if (user) {
      try {
        await sendPost(data.title, data.content, user.id, data.includeImage);
        setLoading(false);
        setIsOpen(false);
        reset();
        onPostClick();
      } catch (error) {
        console.error("Error uploading post:", error);
        setLoading(false);
      }
    }
  };

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
          <form method="post" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.modal}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className={inputStyles.main}
                    {...field}
                    type="text"
                    id="title"
                    placeholder="Title"
                  />
                )}
              />
              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    className={inputStyles.main}
                    {...field}
                    name=""
                    id="textarea"
                    placeholder="

              

Description"
                  />
                )}
              />
              <>
                <Controller
                  name="includeImage"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.toggleSwitch}>
                      <input
                        className={styles.toggleInput}
                        id="toggle"
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <label
                        className={styles.toggleLabel}
                        htmlFor="toggle"
                      ></label>
                      <p>Include defualt image?</p>
                    </div>
                  )}
                />
                {/* <input
                  disabled
                  className={inputStyles.main}
                  type="file"
                  name=""
                  id="file"
                  accept="image/*"
                /> */}
              </>
              <button
                type="submit"
                disabled={loading}
                className={buttonStyles.main}
                id="post"
              >
                Post
              </button>
            </div>
          </form>
        </ModalComponent>
      )}
      <div className={styles.line} />
    </>
  );
};

export default NavbarComponent;
