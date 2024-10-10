import fs from "fs/promises";
import Note from "~/models/Note";

export async function getStoredNotes(): Promise<Note[]> {
  const rawFileContent = await fs.readFile("notes-db.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes: Note[]) {
  return fs.writeFile("notes-db.json", JSON.stringify({ notes: notes || [] }));
}
