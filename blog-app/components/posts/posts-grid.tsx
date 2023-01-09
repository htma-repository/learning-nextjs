import PostItem from "./post-item";
import { IPost } from "../../types/types";

import classes from "./posts-grid.module.css";

interface IProps {
  posts: IPost[];
}

function PostsGrid({ posts }: IProps) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
