import { useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";
import { Link } from "react-router-dom";

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const res = window.confirm("Are you sure you want to delete it?");

    res &&
      submit(null, {
        method: "delete",
      });
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
