import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../store/notification-context";
import { IComments, IError } from "../../utils/type";

import classes from "./comments.module.css";

interface IProps {
  eventId: string | undefined;
}

function Comments({ eventId }: IProps) {
  const [comments, setComments] = useState<IComments[]>([] as IComments[]);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({
    isError: false,
    errorMessage: "",
  });

  const { showNotification } = useContext(NotificationContext);

  const { query } = useRouter();

  useEffect(() => {
    const getComments = async () => {
      try {
        setError({
          isError: false,
          errorMessage: "",
        });
        const response: AxiosResponse<{
          comments: IComments[];
          message: string;
        }> = await axios({
          method: "GET",
          url: `/api/comments/${query.eventId}`,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data;
        setComments(data.comments);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          setError({
            isError: true,
            errorMessage: error.response?.data.message,
          });
          showNotification({
            title: "Error!",
            message: error.response?.data.message,
            status: "error",
          });
        }
      }
    };

    getComments();
  }, [query, showNotification]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData: IComments) {
    setIsLoading(true);
    try {
      // send data to API
      showNotification({
        title: "Send Comment...",
        message: "Processing comment",
        status: "pending",
      });
      const response = await axios({
        method: "POST",
        url: `/api/comments/${eventId}`,
        data: commentData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;

      showNotification({
        title: "Success!",
        message: data?.message,
        status: "success",
      });

      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError({
          isError: true,
          errorMessage: error.response?.data.message,
        });
        showNotification({
          title: "Error!",
          message: error.response?.data.message,
          status: "error",
        });
      }
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <NewComment
          onAddComment={addCommentHandler}
          onLoading={isLoading}
          onError={error}
        />
      )}
      {showComments && <CommentList onComments={comments} />}
    </section>
  );
}

export default Comments;
