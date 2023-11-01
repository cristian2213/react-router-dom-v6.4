import { Suspense } from "react";
import { useLoaderData, json, Await, defer } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    // This is required if Defer is used, Instead of it the useLoaderData will parse it.
    const resData = await response.json();
    return resData.events;
  }
}
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
