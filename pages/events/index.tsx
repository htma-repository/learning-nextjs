import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { IEventItems } from "../../utils/type";
import { getAllEvents } from "../../utils/events-func";
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
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 300,
  };
};

export default AllEventsPage;
