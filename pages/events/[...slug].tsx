import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { getFilteredEvents } from "../../utils/events-func";
import { IEventItems } from "../../utils/interface";
import { getEvent } from "./[eventId]";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

interface IProps {
  events: IEventItems[];
}

const FilteredEventsPage = ({ events }: IProps) => {
  const { query } = useRouter();

  const filterData = query.slug as string[];

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents(events, numYear, numMonth);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getEvent();

  const slug = data.map((data) => data.date);
  const year = slug.map((year) => new Date(year).getFullYear());
  const month = slug.map((month) => new Date(month).getMonth());

  return {
    paths: [
      // { params: { slug: ["2021", "5"] } },
      // { params: { slug: ["2022", "4"] } },
    ],
    fallback: true,
  };
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

export default FilteredEventsPage;
