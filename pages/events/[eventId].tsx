import { GetStaticProps, GetStaticPaths } from "next";

// import { useRouter } from "next/router";

// import { getEventById } from "../../utils/events-func";
import { IEventItems } from "../../utils/interface";
import { getAllEvents, getEventById } from "../../utils/events-func";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import MetaHead from "../../components/ui/meta-head";

interface IProps {
  event: IEventItems;
}

const EventDetailPage = ({ event }: IProps) => {
  console.log(event);
  // const { query } = useRouter();

  // const eventId = query.eventId as string;
  // const event = getEventById(events, eventId) as IEventItems;

  if (!event.id) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <MetaHead title={event.title} desc={event.description} />
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

/* 
  getStaticPaths needed on getStaticProps, but ONLY in dynamic params path, don't always needed both if not used dynamic params 
*/
export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getAllEvents();

  const id = events.map((event) => event.id);

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

  const eventById = (await getEventById(eventId)).find(
    (event) => event.id === eventId
  ) as IEventItems;

  return {
    props: {
      event: eventById,
    },
  };
};

export default EventDetailPage;
