import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  // useRouteLoaderData: With this can access to a higher level loader data from a router without loader.
  const data = useRouteLoaderData("event-detail");

  return <EventForm event={data.event} method="patch" />;
}

export default EditEventPage;
