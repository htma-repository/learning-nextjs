import axios from "axios";

import { IEventItems } from "./interface";

const API = axios.create({ baseURL: "http://localhost:8000/" });

export async function getAllEvents() {
  const response = await API.get("events");
  const data: IEventItems[] = await response.data;

  return data;
}

export async function getFeaturedEvents() {
  const featuredEvent = await getAllEvents();
  return featuredEvent.filter((event) => event.isFeatured);
}

export function getFilteredEvents(
  eventsData: IEventItems[],
  year: number,
  month: number
) {
  // const getAllEvent = await getAllEvents();
  // const filteredEvents = getAllEvent.filter((event) => {
  //   const eventDate = new Date(event.date);
  //   return (
  //     eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  //   );
  // });

  const filteredEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id: string) {
  const getAllEvent = await getAllEvents();
  return getAllEvent.find((event) => event.id === id);
}
