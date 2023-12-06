import {
  SaveLoanProps,
  SaveLoanTransactionProps,
  SaveTransactionProps,
  SaveUserProps,
  UserProps,
} from "types/User";
import {
  addPartnerJob,
  addReferences,
  addTran,
  addUser,
  fetchAccountLoans,
  fetchAccountsByUserId,
  fetchAccountTransactions,
  fetchAllUsers,
  fetchLoanById,
  fetchLoansForApprove,
  fetchLoanTransactions,
  fetchUserByCard,
  fetchUserById,
  saveLoan,
  saveLoanTransaction,
  signin,
} from "../services/user";
import { useEffect, useState } from "react";
import { ErrorProps } from "types/Error";
import { Models } from "appwrite";
import { ReferenceProps } from "views/addUser";

export const useFetchAllUsers = (): [
  Models.Document[],
  boolean,
  ErrorProps | null
] => {
  const [users, setUsers] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAllUsers();

      setUsers(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [users, loading, error];
};

export const useAddUser = (): [
  (
    values: SaveUserProps,
    references: ReferenceProps[],
    onDone?: () => void
  ) => void,
  boolean,
  ErrorProps | null
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handleAddUser(
    values: SaveUserProps,
    references: ReferenceProps[],
    onDone?: () => void
  ) {
    try {
      setLoading(true);
      setError(null);
      const job = await addPartnerJob(values?.partner_job);

      const { partner_job, ...otherValues } = values;

      const user = await addUser({ ...otherValues, partner_job_id: job?.$id });

      await addReferences(references, user?.$id);
      onDone?.();
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [handleAddUser, loading, error];
};

export const useFetchUserById = (
  id?: string
): [Models.Document | undefined, boolean, ErrorProps | null] => {
  const [users, setUsers] = useState<Models.Document>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const document = await fetchUserById(id);

      setUsers(document);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [users, loading, error];
};

export const useFetchAccountsByUserId = (
  id?: string
): [Models.Document[] | undefined, boolean, ErrorProps | null] => {
  const [accounts, setAccounts] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, [id]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAccountsByUserId(id);

      setAccounts(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [accounts, loading, error];
};

export const useFetchUserByCard = (
  card?: string
): [Models.Document | undefined, boolean, ErrorProps | null] => {
  const [users, setUsers] = useState<Models.Document>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, [card]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);
      setUsers(undefined);

      const { documents } = await fetchUserByCard(card);

      setUsers(documents?.[0]);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [users, loading, error];
};

export const useAddTransaction = (): [
  (values: SaveTransactionProps, onDone?: () => void) => void,
  boolean,
  ErrorProps | null
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handleAddTran(
    values: SaveTransactionProps,
    onDone?: () => void
  ) {
    try {
      setLoading(true);
      setError(null);

      await addTran(values);

      onDone?.();
    } catch (error: any) {
      console.log(error);

      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [handleAddTran, loading, error];
};

export const useFetchAccountTransactions = (
  id?: string
): [Models.Document[] | undefined, boolean, ErrorProps | null] => {
  const [accounts, setAccounts] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAccountTransactions(id);

      setAccounts(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [accounts, loading, error];
};

export const useAddLoan = (): [
  (values: SaveLoanProps, userId: string, onDone?: () => void) => void,
  boolean,
  ErrorProps | null
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handleAddTran(
    values: SaveLoanProps,
    userId: string,
    onDone?: () => void
  ) {
    try {
      setLoading(true);
      setError(null);

      await saveLoan(values, userId);

      onDone?.();
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [handleAddTran, loading, error];
};

export const useFetchLoans = (
  id?: string
): [Models.Document[] | undefined, boolean, ErrorProps | null] => {
  const [accounts, setAccounts] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchAccountLoans(id);

      setAccounts(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [accounts, loading, error];
};
export const useFetchLoanById = (
  id?: string
): [Models.Document | undefined, boolean, ErrorProps | null] => {
  const [loan, setAccounts] = useState<Models.Document>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const document = await fetchLoanById(id);

      setAccounts(document);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [loan, loading, error];
};

export const useFetchLoanTransactions = (
  id?: string
): [Models.Document[] | undefined, boolean, ErrorProps | null] => {
  const [transactions, setTransactions] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchLoanTransactions(id);

      setTransactions(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [transactions, loading, error];
};

export const useAddLoanTransaction = (): [
  (values: SaveLoanTransactionProps, onDone?: () => void) => void,
  boolean,
  ErrorProps | null
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handleAddTran(
    values: SaveLoanTransactionProps,
    onDone?: () => void
  ) {
    try {
      setLoading(true);
      setError(null);

      await saveLoanTransaction(values);

      onDone?.();
    } catch (error: any) {
      console.log(error);

      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [handleAddTran, loading, error];
};

export const useSignin = (): [
  (usuario: string, onDone?: () => void) => void,
  boolean,
  ErrorProps | null
] => {
  const [user, setUser] = useState<Models.Document>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  async function handleAddTran(usuario: string, onDone?: () => void) {
    try {
      setLoading(true);
      setError(null);

      const document = await signin(usuario);

      if (document) {
        setUser(document);
        localStorage.setItem("user", JSON.stringify(document));
      }

      onDone?.();
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [handleAddTran, loading, error];
};

export const useFetchLoansForApprove = (): [
  Models.Document[] | undefined,
  boolean,
  ErrorProps | null
] => {
  const [accounts, setAccounts] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorProps | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      setLoading(true);
      setError(null);

      const { documents } = await fetchLoansForApprove();

      setAccounts(documents);
    } catch (error: any) {
      setError({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  }

  return [accounts, loading, error];
};
