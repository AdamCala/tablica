import PostComponent from "../../components/PostComponent/PostComponent";

function RootPage() {
  return (
    <>
      <div>
        <PostComponent image={false} />
        <PostComponent image={true} />
        <PostComponent image={true} />
        <PostComponent image={false} />
        <PostComponent image={true} />
        <PostComponent image={false} />
        <PostComponent image={true} />
        <PostComponent image={false} />
      </div>
    </>
  );
}

export default RootPage;
