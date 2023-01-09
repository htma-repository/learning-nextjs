import PostsGrid from "../posts/posts-grid";
import { IPost } from "../../types/types";

import classes from "./featured-posts.module.css";

interface IProps {
  posts: IPost[];
}

function FeaturedPosts({ posts }: IProps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
