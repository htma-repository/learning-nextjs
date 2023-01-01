import EventItem from "./event-item";

import { IEventItems } from "../../utils/interface";
import MetaHead from "../ui/meta-head";

import classes from "./event-list.module.css";

interface IProps {
  items: IEventItems[];
}

const EventList = ({ items }: IProps) => {
  return (
    <>
      <ul className={classes.list}>
        {items.map((item) => (
          <EventItem
            key={item.id}
            id={item.id}
            title={item.title}
            location={item.location}
            date={item.date}
            image={item.image}
          />
        ))}
      </ul>
    </>
  );
};

export default EventList;
