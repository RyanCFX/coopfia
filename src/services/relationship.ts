import { databases } from "lib/appwrite";
import { DATABASE, TABLES } from "constans/appwrite";

export async function fetchAllRelationships() {
  const data = await databases.listDocuments(
    DATABASE.id,
    TABLES.partner_relationship.id
  );

  return data;
}
