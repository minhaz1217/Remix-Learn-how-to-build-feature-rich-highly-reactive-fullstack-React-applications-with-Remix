import Note from "~/models/Note";
import styles from "./NoteList.css?url";
import { Link } from "@remix-run/react";

function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <Link to={note.id}>
          <li key={note.id} className="note">
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
            </article>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
