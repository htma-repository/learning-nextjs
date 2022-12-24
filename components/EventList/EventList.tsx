import React from "react";

import Card from "../UI/Card";
import { getAllEvents, getFeaturedEvents } from "../../utils/dummy-data";

import styles from "./event-list.module.css";

const EventList = () => {
  const getEvents = getAllEvents();

  return (
    <section>
      <ul className={styles["event-list"]}>
        {getEvents.map((event) => {
          return (
            <li key={event.id} className={styles["event-item"]}>
              <Card
                date={event.date}
                location={event.location}
                image={event.image}
                title={event.title}
                imgClassName=""
              >
                {event.title}
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default EventList;
