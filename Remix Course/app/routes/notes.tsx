import { ActionFunctionArgs, MetaArgs, MetaDescriptor } from "@remix-run/node";
import {
  isRouteErrorResponse,
  json,
  Link,
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
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find note" },
      { status: 404, statusText: "Not Found" }
    );
  }
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

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <NewNote />
        <main className="error">
          <h1>Oops</h1>
          <p>Status: {error.status}</p>
          <p>{error.data.message}</p>
        </main>
      </>
    );
  }

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

export function meta({ data }: MetaArgs): MetaDescriptor[] {
  return [
    {
      title: "All Notes",
      description: "Manage your notes with ease",
    },
  ];
}
