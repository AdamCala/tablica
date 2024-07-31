import { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import PostComponent from "../../components/PostComponent/PostComponent";
import styles from "../../styles/pages/_root-page.module.scss";
import { PostEntity } from "../../models/postModel";

const getPosts = async (): Promise<PostEntity[]> => {
  try {
    const response = await fetch("http://localhost:3001/post/posts/");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const RootPage = () => {
  const [postList, setPostList] = useState<PostEntity[]>([]);
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        console.log(data);
        setPostList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, [refreshPosts]);

  const handleRefresh = () => {
    setRefreshPosts((prev) => !prev);
  };

  return (
    <>
      <NavbarComponent onPostClick={handleRefresh} />
      <div className={styles.main}>
        <div className={styles.posts}>
          {postList.map((post) => (
            <PostComponent
              id={post.id}
              title={post.title}
              content={post.content}
              image={post.image}
              authorId={post.authorId}
              author={post.author}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RootPage;
