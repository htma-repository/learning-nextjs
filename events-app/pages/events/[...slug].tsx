import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../utils/events-func";
import { IEventItems } from "../../utils/type";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

interface IProps {
  events: IEventItems[];
  numYear: number;
  numMonth: number;
  hasError: boolean;
}

const FilteredEventsPage = ({
  events,
  numYear,
  numMonth,
  hasError,
}: IProps) => {
  const { query } = useRouter();

  // const filterData = query.slug as string[];

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  if (hasError) {
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

  if (!events || events.length === 0) {
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
      <EventList items={events} />
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

  // const response = await axios.get("http://localhost:8000/events");
  // const data: IEventItems[] = await response.data;

  const { params } = context;

  const filterData = params?.slug as string[];

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
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
    };
  }

  const data = await getFilteredEvents(numYear, numMonth);

  if (!data || data.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      events: data,
      numYear,
      numMonth,
    },
  };
};

export default FilteredEventsPage;
