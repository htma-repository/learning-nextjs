import axios, { AxiosResponse } from "axios";

import { IEventItems } from "./type";

export const API = axios.create({ baseURL: "http://localhost:3000/api/" });

export async function getAllEvents() {
  const response: AxiosResponse<{ events: IEventItems[] }> = await API({
    method: "GET",
    url: "events",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.data;
  return data.events;
}

export async function getEventById(id: string) {
  const response: AxiosResponse<{ event: IEventItems }> = await API({
    method: "GET",
    url: `events/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.data;
  return data.event;
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
