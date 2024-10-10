import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function Notes() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  noteData.id = new Date().toISOString();

  const existingData = await getStoredNotes();
  const updatedNotes = existingData.concat(noteData);
  await storeNotes(updatedNotes);
  // return redirect("/notes"); // if needed
  return null;
}

export function links() {
  return [...newNoteLinks()];
}
