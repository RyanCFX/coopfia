import { ProvinceProps } from "types/Location";
import {
  fetchAllCountries,
  fetchAllProvinces,
  fetchSectorsByProvince,
} from "../services/location";
import { useEffect, useState } from "react";
import { ErrorProps } from "types/Error";
import { Models } from "appwrite";

export const useFetchAllProvinces = (): [
  Models.Document[],
  boolean,
  ErrorProps | null
] => {
  const [provinces, setProvinces] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAllProvinces();

      setProvinces(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [provinces, loading, error];
};

export const useFetchSectorsByProvince = (
  id?: string
): [Models.Document[], boolean, ErrorProps | null] => {
  const [sectors, setSectors] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (id) {
      fetch(id);
    }
  }, [id]);

  async function fetch(id: string) {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchSectorsByProvince(id);

      console.log(documents);

      setSectors(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [sectors, loading, error];
};

export const useFetchAllCountries = (): [
  Models.Document[],
  boolean,
  ErrorProps | null
] => {
  const [countries, setCountries] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAllCountries();

      setCountries(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [countries, loading, error];
};
