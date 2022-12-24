import Link from "next/link";
import { useRouter } from "next/router";

import EventList from "../../components/EventList/EventList";

const EventsPage = () => {
  const { pathname } = useRouter();

  console.log(pathname, "/accountId");

  // link alternative <Link href={{
  //   pathname: 'account/[accountId]',
  //   query: {
  //     accountId: 'account1'
  //   }
  // }}></Link>

  return (
    <section>
      <h1>Events Page</h1>

      <EventList />

      {/* <Link href={`${pathname}/account1`}>
        <button>Events Details</button>
      </Link> */}
    </section>
  );
};

export default EventsPage;
