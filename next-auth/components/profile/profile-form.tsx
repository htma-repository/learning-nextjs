import React, { use, useState } from "react";

import useHttp from "../../hooks/useHttp";

import classes from "./profile-form.module.css";

export default function ProfileForm() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const { requestHttp } = useHttp();

  function changeOldPasswordHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setOldPassword(event.target.value);
  }

  function changeNewPasswordHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNewPassword(event.target.value);
  }

  async function changePasswordSubmitHandler(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!oldPassword || !newPassword) {
      return;
    }

    await requestHttp(
      {
        method: "PATCH",
        url: "/user/change-password",
        data: {
          oldPassword,
          newPassword,
        },
      },
      (data) => {
        console.log(data);
        setOldPassword("");
        setNewPassword("");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <form className={classes.form} onSubmit={changePasswordSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          onChange={changeNewPasswordHandler}
          value={newPassword}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          onChange={changeOldPasswordHandler}
          value={oldPassword}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
