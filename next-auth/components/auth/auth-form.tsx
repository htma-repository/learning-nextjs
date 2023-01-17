import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import useInputState from "../../hooks/useInputState";
import useHttp from "../../hooks/useHttp";

import classes from "./auth-form.module.css";

export default function AuthForm() {
  const { replace } = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { input: isErrorInput, setInput: setIsErrorInput } = useInputState({
    isError: false,
    errorMessage: "",
  });
  const { input: isSuccessInput, setInput: setIsSuccessInput } = useInputState({
    isSuccess: false,
    successMessage: "",
  });
  const {
    input: authInput,
    setInput: setAuthInput,
    onChangeInputHandler: authInputHandler,
  } = useInputState({
    email: "",
    password: "",
  });
  const { requestHttp } = useHttp();

  const { email, password } = authInput;
  const { errorMessage, isError } = isErrorInput;
  const { successMessage, isSuccess } = isSuccessInput;

  console.log("isLoading", isLoading);

  useEffect(() => {
    if (email || password) {
      setIsErrorInput({
        isError: false,
        errorMessage: "",
      });
    }
  }, [email, password, setIsErrorInput]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitAuthHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      setIsErrorInput({
        isError: true,
        errorMessage:
          "Input correct email and password!, Password should 7 characters long!",
      });
      return;
    }

    if (isLogin) {
      /* A function from next-auth/react. It is used to sign in user. */
      setIsLoading(true);
      const sign = await signIn("credentials", {
        /* Used to prevent redirecting to the page after sign in. */
        redirect: false,
        /* Used to pass email and password to the server. */
        email: email,
        password: password,
      });

      if (sign.ok) {
        replace("/profile");

        // window.location.href = "/profile";
      } else {
        setIsErrorInput({
          isError: true,
          errorMessage: sign.error,
        });
      }
      setIsLoading(false);
    } else {
      requestHttp(
        {
          method: "POST",
          url: "/auth/signUp",
          data: authInput,
        },
        (data: { message: string }) => {
          setIsSuccessInput({
            isSuccess: true,
            successMessage: `${data.message}`,
          });
          replace("/profile");
        },
        (error) => {
          setIsErrorInput({
            isError: true,
            errorMessage: error.message,
          });
        }
      );
    }

    setAuthInput({
      email: "",
      password: "",
    });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitAuthHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={authInputHandler}
            name={"email"}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={authInputHandler}
            name={"password"}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {isLoading && <p className={classes.success}>Loading...</p>}
          {isError && <p className={classes.error}>{errorMessage}</p>}
          {isSuccess && <p className={classes.success}>{successMessage}</p>}
        </div>
      </form>
    </section>
  );
}
