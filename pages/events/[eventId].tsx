import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { IEventItems } from "../../utils/type";
import { getAllEvents, getEventById } from "../../utils/events-func";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import MetaHead from "../../components/ui/meta-head";
import Comments from "../../components/input/comments";

interface IProps {
  event: IEventItems;
}

const EventDetailPage = ({ event }: IProps) => {
  const [clientEvent, setClientEvent] = useState<IEventItems>(event);
  const { query } = useRouter();

  const eventId = query.eventId as string;

  useEffect(() => {
    const getEventById = async () => {
      const response = await axios.get(`/api/events/${eventId}`);
      const data: { event: IEventItems } = await response.data;

      setClientEvent(data.event);
    };

    getEventById();
  }, [eventId]);

  if (!clientEvent._id) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <MetaHead title={clientEvent.title} desc={clientEvent.description} />
      <EventSummary title={clientEvent.title} />
      <EventLogistics
        date={clientEvent.date}
        address={clientEvent.location}
        image={clientEvent.image}
        imageAlt={clientEvent.title}
      />
      <EventContent>
        <p>{clientEvent.description}</p>
      </EventContent>
      <Comments eventId={clientEvent._id} />
    </>
  );
};

/* 
  getStaticPaths needed on getStaticProps, but ONLY in dynamic params path, don't always needed both if not used dynamic params 
*/
export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();

  const id = events.map((event) => event._id);

  const params = id.map((id) => ({
    params: { eventId: id },
  }));

  return {
    paths: params,
    /* 
      fallback can be true, false or 'blocking', 
      true = nextjs CAN view page by params without params list on paths but need checking in component function, because page need time to generated or it will error.
      false = nextjs CANNOT view page by params without list on paths. can ONLY view page on paths params list.
      'blocking' = nextjs CAN view page by params without params list on paths, NO need checking in component function, because nextjs will wait until page ready from generated.
    */
    fallback: "blocking", // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const eventId = params?.eventId as string;

  const eventById = await getEventById(eventId);

  return {
    props: {
      event: eventById,
    },
  };
};

export default EventDetailPage;
