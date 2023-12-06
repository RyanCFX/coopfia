import { RelationshipProps } from "types/Relationship";
import { fetchAllRelationships } from "../services/relationship";
import { useEffect, useState } from "react";
import { ErrorProps } from "types/Error";
import { Models } from "appwrite";

export const useFetchAllRelationships = (): [
  Models.Document[],
  boolean,
  ErrorProps | null
] => {
  const [relationships, setRelationships] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAllRelationships();

      setRelationships(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [relationships, loading, error];
};
