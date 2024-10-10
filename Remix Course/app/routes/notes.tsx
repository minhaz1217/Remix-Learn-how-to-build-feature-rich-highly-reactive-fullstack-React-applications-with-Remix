import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import {
  json,
  Link,
  useActionData,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote/NewNote";
import NoteList, {
  links as noteListLinks,
} from "~/components/NoteList/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import Note from "~/models/Note";

export default function Notes() {
  const notes = useLoaderData<typeof loader>();
  // const actionData = useActionData<typeof action>();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  noteData.id = new Date().toISOString();

  if (noteData.title.trim().length < 5) {
    return { message: "Title should be at least 5 characters" };
  }

  const existingData = await getStoredNotes();
  const updatedNotes = existingData.concat(noteData as any);
  await storeNotes(updatedNotes);
  // return redirect("/notes"); // if needed
  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">Safety</Link>
      </p>
    </main>
  );
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
