import React, { useRef, useContext } from "react";
import axios from "axios";

import Button from "../ui/button";
import NotificationContext from "../../store/notification-context";

import classes from "./events-form.module.css";

const EventsForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const { showNotification } = useContext(NotificationContext);

  const formEventSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const description = descRef.current?.value;
    const location = locationRef.current?.value;
    const date = dateRef.current?.value;

    const newEvents = {
      title,
      description,
      location,
      date,
      image: "images/coding-event.jpg",
      isFeatured: true,
    };

    try {
      showNotification({
        title: "Send New Event...",
        message: "Processing event",
        status: "pending",
      });
      const response = await axios({
        method: "POST",
        url: "/api/events",
        data: newEvents,
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
        showNotification({
          title: "Error!",
          message: error.response?.data.message,
          status: "error",
        });
      }
    }

    // const response = await axios.post(
    //   "http://localhost:3000/api/events",
    //   newEvents
    // );

    // const data = await response.data;
    // console.log("🚀 ~ file: events-form.tsx:39 ~ EventsForm ~ data", data);

    if (
      titleRef.current &&
      descRef.current &&
      locationRef.current &&
      dateRef.current
    ) {
      titleRef.current.value = "";
      descRef.current.value = "";
      locationRef.current.value = "";
      dateRef.current.value = "";
    }
  };

  return (
    <section>
      <form onSubmit={formEventSubmitHandler} className={classes.form}>
        <div>
          <label htmlFor="event-title">Event Title : </label>
          <input type="text" id="event-title" ref={titleRef} required />
        </div>
        <div>
          <label htmlFor="event-desc">Event Description : </label>
          <textarea
            name=""
            id="event-desc"
            cols={30}
            rows={10}
            ref={descRef}
            required
          />
        </div>
        <div>
          <label htmlFor="event-location">Event Location : </label>
          <input type="text" id="event-location" ref={locationRef} required />
        </div>
        <div>
          <label htmlFor="event-date">Date : </label>
          <input type="date" id="event-date" ref={dateRef} required />
        </div>

        <Button>Submit</Button>
      </form>
    </section>
  );
};

export default EventsForm;
