import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
// import fs from "fs/promises";
// import path from "path";

import { getFeaturedEvents } from "../utils/events-func";
import { IEventItems } from "../utils/interface";
import EventList from "../components/events/event-list";
import MetaHead from "../components/ui/meta-head";

interface IProps {
  events: IEventItems[];
}

function HomePage({ events }: IProps) {
  const [eventsData, setEventsData] = useState<IEventItems[]>(events);
  // const featuredEvents = getFeaturedEvents(eventsData);

  // Client site data fetching
  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get("http://localhost:8000/events");
      const data: IEventItems[] = await response.data;

      setEventsData(data);
    };

    getEvents();
  }, []);

  return (
    <div>
      <MetaHead title="Events" desc="List All Events you can visit" />
      <EventList items={eventsData} />
    </div>
  );
}

// Pre-rendering data fetching
export const getStaticProps: GetStaticProps = async () => {
  /* read db.json file with fs & path library, can only used in server side code */

  // const filePath = path.join(process.cwd(), "events-db.json");
  // const eventsData = await fs.readFile(filePath);
  // const newData = JSON.parse(eventsData.toString());
  // console.log(newData.events);

  /* 
    fetch data with axios
  */
  // const response = await axios.get("http://localhost:8000/events");
  // const data: IEventItems[] = await response.data;

  const featuredEvents = await getFeaturedEvents();

  if (!featuredEvents) {
    return {
      props: {},
      redirect: {
        destination: "/events",
      },
    };
  }

  if (featuredEvents.length < 1) {
    return { props: {}, notFound: true };
  }

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 600,
    /* 
      revalidate data every 10 second (ISR) Incremental Static Re-generation, ONLY can use on getStaticProps
    */
    // revalidate: 10,

    /* 
      view not found page instead data from server, good to use if data not found on server
    */
    // notFound: true,

    /*
      redirect page after fetching data, good to use if the data failed to get from server & want to open other page automatically
     */
    // redirect: {
    //   destination: "/events",
    // },
  };
};

export default HomePage;
