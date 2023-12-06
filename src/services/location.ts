import { databases } from "lib/appwrite";
import { DATABASE, TABLES } from "constans/appwrite";
import { Query } from "appwrite";

export async function fetchAllProvinces() {
  const data = await databases.listDocuments(DATABASE.id, TABLES.provinces.id);
  return data;
}

export async function fetchSectorsByProvince(provinceId: string) {
  console.log(provinceId);

  const data = await databases.listDocuments(DATABASE.id, TABLES.sectors.id, [
    Query.equal("province_id", provinceId),
  ]);
  return data;
}

export async function fetchAllCountries() {
  const data = await databases.listDocuments(DATABASE.id, TABLES.countries.id, [Query.limit(208)]);
  return data;
}
