import { ProfessionProps } from "types/Profession";
import { fetchAllProfessions } from "../services/profession";
import { useEffect, useState } from "react";
import { ErrorProps } from "types/Error";
import { Models } from "appwrite";

export const useFetchAllProfessions = (): [
  Models.Document[],
  boolean,
  ErrorProps | null
] => {
  const [professions, setProfessions] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAllProfessions();

      setProfessions(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [professions, loading, error];
};
