import React, { useRef, useState } from "react";
import classes from "./new-comment.module.css";

import { IComments, IError } from "../../utils/type";

interface IProps {
  onAddComment: (commentData: IComments) => void;
  onLoading: boolean;
  onError: IError;
}

function NewComment({ onAddComment, onLoading, onError }: IProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const enteredComment = commentInputRef.current?.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    if (
      emailInputRef.current &&
      nameInputRef.current &&
      commentInputRef.current
    ) {
      emailInputRef.current.value = "";
      nameInputRef.current.value = "";
      commentInputRef.current.value = "";
    }
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      {onLoading && <p>Loading...</p>}
      {onError.isError && (
        <p style={{ textAlign: "center", color: "red" }}>
          {onError.errorMessage}
        </p>
      )}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
