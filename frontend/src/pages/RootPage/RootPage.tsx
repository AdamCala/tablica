import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import PostComponent from "../../components/PostComponent/PostComponent";
import styles from "../../styles/pages/_root-page.module.scss";

const RootPage: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <div className={styles.main}>
        <div className={styles.posts}>
          <PostComponent image={false} />
          <PostComponent image={false} />
          <PostComponent image={true} />
          <PostComponent image={false} />
          <PostComponent image={true} />
          <PostComponent image={false} />
          <PostComponent image={true} />
          <PostComponent image={false} />
          <PostComponent image={false} />
        </div>
      </div>
    </>
  );
};

export default RootPage;
