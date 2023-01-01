import axios from "axios";

import { IEventItems } from "./interface";

const API = axios.create({ baseURL: "http://localhost:3000/api/" });

export async function getAllEvents() {
  const response = await API.get("events");
  const data: IEventItems[] = await response.data.events;

  return data;
}

export async function getFeaturedEvents() {
  const featuredEvent = await getAllEvents();
  return featuredEvent.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(year: number, month: number) {
  const getAllEvent = await getAllEvents();
  const filteredEvents = getAllEvent.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id: string) {
  // const response = await API.get(`events/${id}`);
  // const data: IEventItems = await response.data;
  const events = await getAllEvents();
  const eventById = events.filter((event) => event.id === id);
  console.log(eventById);

  return eventById;
}
