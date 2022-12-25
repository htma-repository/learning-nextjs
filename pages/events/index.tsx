import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { IEventItems } from "../../utils/interface";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

interface IProps {
  events: IEventItems[];
}

const AllEventsPage = ({ events }: IProps) => {
  const { push } = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("http://localhost:8000/events");
  const data: IEventItems[] = await response.data;

  return {
    props: {
      events: data,
    },
  };
};

export default AllEventsPage;
