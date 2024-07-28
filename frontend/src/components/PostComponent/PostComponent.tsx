interface Post {
  image: boolean;
}

const postComponent: React.FC<Post> = (props) => {
  const { image } = props;
  return (
    <div>
      <h1>Test Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
        architecto, veniam ad est accusantium laborum, reprehenderit velit omnis
        possimus iusto harum porro doloribus veritatis. Recusandae doloremque
        quibusdam nesciunt accusamus eaque?
      </p>
      {image ? (
        <img src="https://picsum.photos/500/300" alt="test image" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default postComponent;
