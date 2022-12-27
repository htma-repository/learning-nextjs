import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getAllEvents, getFilteredEvents } from "../../utils/events-func";
import { IEventItems } from "../../utils/interface";
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

  console.log(filteredEvents);

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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await getEvent();

//   const slug = data.map((data) => data.date);
//   const years = slug.map((year) => new Date(year).getFullYear().toString());
//   const months = slug.map((month) =>
//     (new Date(month).getMonth() + 1).toString()
//   );

//   const result: string[][] = [];
//   years.forEach((year, index) => {
//     result.push([year, months[index]]);
//   });

//   const params = result.map((param) => {
//     return { params: { slug: param } };
//   });

//   return {
//     paths: params,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await axios.get("http://localhost:8000/events");
//   const data: IEventItems[] = await response.data;

//   if (!data || data.length === 0) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       events: data,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { params } = context;

  // console.log(params?.slug);

  // const response = await axios.get("http://localhost:8000/events");
  // const data: IEventItems[] = await response.data;

  const data = await getAllEvents();

  if (!data || data.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      events: data,
    },
  };
};

export default FilteredEventsPage;
