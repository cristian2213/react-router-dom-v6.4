import {
  useNavigate,
  useNavigation,
  useActionData,
  Form,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form className={classes.form} method={method}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event?.title ?? ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event?.image ?? ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event?.date ?? ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event?.description ?? ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {};

  for (const pair of data.entries()) eventData[pair[0]] = pair[1];

  let url = "http://localhost:8080/events";

  if (request.method === "PATCH") {
    const eventId = params.eventId;
    url += `/${eventId}`;
  }

  const res = await fetch(url, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  if (res.status === 422) return res;

  if (!res.ok)
    throw json({ message: "Could not save event." }, { status: 500 });

  return redirect("/events");
}

export default EventForm;
