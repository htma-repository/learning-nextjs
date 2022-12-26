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

  console.log(event);

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

export const getEvent = async (eventId?: string) => {
  const response = await axios.get(
    `${
      eventId
        ? `http://localhost:8000/events/${eventId}`
        : "http://localhost:8000/events/"
    }`
  );
  const data: IEventItems[] = await response.data;
  return data;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getEvent();

  const id = events.map((event) => event.id);

  const params = id.map((id) => ({
    params: { eventId: id },
  }));

  return {
    paths: params,
    /* 
      fallback can be true, false or 'blocking', 
      true = nextjs CAN view page by params without params list on paths but need checking in component function, because page need time to generated.
      false = nextjs CANNOT view page by params without list on paths,
      'blocking' = nextjs CAN view page by params without params list on paths, NO need checking in component function, because nextjs will wait until page ready from generated.
    */
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const eventId = params?.eventId as string;

  const data = await getEvent(eventId);

  return {
    props: {
      event: data,
    },
  };
};

export default EventDetailPage;
