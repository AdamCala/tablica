import * as yup from "yup";

export const postSchema = () => {
  let schema = yup.object().shape({
    title: yup.string().required("Title is required"),

    content: yup.string().required("Description is required"),
  });

  return schema;
};

export interface PostModel {
  title: string;
  content: string;
  includeImage?: boolean;
}

interface Author {
  name: string;
}

export interface PostEntity {
  id: number;
  title: string;
  content: string;
  image: string;
  authorId: number;
  author: Author;
}
