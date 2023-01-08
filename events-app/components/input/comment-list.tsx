import { useRouter } from "next/router";

import { IComments } from "../../utils/type";

import classes from "./comment-list.module.css";

interface IProps {
  onComments: IComments[];
}

function CommentList({ onComments }: IProps) {
  const { query } = useRouter();

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {onComments
        .filter((comment) => comment.eventId === query.eventId)
        .map((comment) => {
          return (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <div>
                By <address>{comment.name}</address>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default CommentList;
