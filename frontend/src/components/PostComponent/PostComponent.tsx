import styles from "../../styles/components/_post-component.module.scss";

interface Post {
  image: boolean;
}

const PostComponent: React.FC<Post> = (props) => {
  const { image } = props;
  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <h1>Test Title</h1>
        <h3>Jon Snow</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          architecto, veniam ad est accusantium laborum, reprehenderit velit
          omnis possimus iusto harum porro doloribus veritatis. Recusandae
          doloremque quibusdam nesciunt accusamus eaque?
        </p>
      </div>
      {image ? (
        <img src="https://picsum.photos/500/300" alt="test image" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostComponent;
