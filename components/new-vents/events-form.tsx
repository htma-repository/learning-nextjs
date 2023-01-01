import React, { useRef } from "react";
import axios from "axios";

import Button from "../ui/button";

import classes from "./events-form.module.css";

const EventsForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const formEventSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const description = descRef.current?.value;
    const location = locationRef.current?.value;
    const date = dateRef.current?.value;

    // console.log({ title, description, location, date });

    const newEvents = {
      title,
      description,
      location,
      date,
      image: "images/coding-event.jpg",
      isFeatured: true,
    };

    const response = await axios.post(
      "http://localhost:3000/api/events",
      newEvents
    );

    const data = await response;

    console.log(data);

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
