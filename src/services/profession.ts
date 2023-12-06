import { databases } from "lib/appwrite";
import { DATABASE, TABLES } from "constans/appwrite";

export async function fetchAllProfessions() {
  const data = await databases.listDocuments(DATABASE.id, TABLES.professions.id);
  
  return data;
}
