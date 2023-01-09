import PostsGrid from "./posts-grid";
import { IPost } from "../../types/types";

import classes from "./all-posts.module.css";

interface IProps {
  posts: IPost[];
}

function AllPosts({ posts }: IProps) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default AllPosts;
