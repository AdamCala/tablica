import styles from "../../styles/components/_post-component.module.scss";
import { PostEntity } from "../../models/postModel";

const PostComponent: React.FC<PostEntity> = (props) => {
  const { id, title, content, image, author } = props;
  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <h1>{props.title}</h1>
        <h3>{props.author.name}</h3>
        <p>{props.content}</p>
      </div>
      {image ? <img src={props.image} alt={props.title} /> : <></>}
    </div>
  );
};

export default PostComponent;
