import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { getEventById } from "../../utils/events-func";
import { IEventItems } from "../../utils/interface";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

interface IProps {
  event: IEventItems;
}

const EventDetailPage = ({ event }: IProps) => {
  // const { query } = useRouter();

  // const eventId = query.eventId as string;
  // const event = getEventById(events, eventId) as IEventItems;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { eventId: "e1" } },
      { params: { eventId: "e2" } },
      { params: { eventId: "e3" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const eventId = params?.eventId as string;

  const response = await axios.get(`http://localhost:8000/events/${eventId}`);
  const data = await response.data;

  return {
    props: {
      events: data,
    },
  };
};

export default EventDetailPage;
