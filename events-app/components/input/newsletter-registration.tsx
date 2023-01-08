import React, { useRef, useState, useContext } from "react";
import axios from "axios";

import { IError } from "../../utils/type";
import NotificationContext from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [error, setError] = useState<IError>({
    isError: false,
    errorMessage: "",
  });
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { showNotification } = useContext(NotificationContext);

  async function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const emailInput = emailInputRef.current?.value;

    if (!emailInput || emailInput?.trim() === "") {
      return;
    }

    const userEmail = {
      email: emailInput,
    };

    try {
      setError({
        isError: false,
        errorMessage: "",
      });
      showNotification({
        title: "Signing Up...",
        message: "Processing newsletter",
        status: "pending",
      });
      const response = await axios({
        method: "POST",
        url: "/api/newsletter",
        data: userEmail,
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError({ isError: true, errorMessage: error.response?.data.message });
        showNotification({
          title: "Error!",
          message: error.response?.data.message,
          status: "error",
        });
      }
    }

    if (emailInputRef.current) {
      emailInputRef.current.value = "";
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      {error.isError && (
        <p style={{ textAlign: "center", color: "red" }}>
          {error.errorMessage}
        </p>
      )}
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
