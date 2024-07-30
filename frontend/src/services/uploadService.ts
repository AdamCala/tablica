export const sendPost = async (
  title: string,
  content: string,
  author: string,
  includeImage: boolean | undefined
) => {
  let imageUrl = "";
  if (includeImage) {
    let imageUrl = "https://picsum.photos/500/300";
  }

  const postResponse = await fetch("http://localhost:3001/post/createPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image: imageUrl,
      authorId: author,
    }),
  });

  if (!postResponse.ok) {
    throw new Error("Post creation failed");
  }

  const postResult = await postResponse.json();
  return postResult;
};
