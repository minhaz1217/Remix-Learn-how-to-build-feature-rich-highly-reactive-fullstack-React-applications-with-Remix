import { LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Link,
  MetaArgs,
  MetaDescriptor,
  useLoaderData,
} from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import Note from "~/models/Note";
import styles from "~/styles/note-details.css?url";

export default function NoteDetailsPage() {
  const note = useLoaderData<Note>();
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
        <p id="note-details-content">{note.content}</p>
      </header>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === params.noteId);
  if (!selectedNote) {
    throw json(
      {
        message: "Couldn't find the id",
      },
      {
        status: 404,
      }
    );
  }
  return selectedNote;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
export function meta({ data }: MetaArgs): MetaDescriptor[] {
  return [
    {
      title: data.title,
      description: "Manage your notes with ease",
    },
  ];
}
