import { databases } from "lib/appwrite";
import { DATABASE, TABLES } from "constans/appwrite";
import { UUID } from "uuidjs";
import {
  JobProps,
  SaveLoanProps,
  SaveLoanTransactionProps,
  SaveTransactionProps,
  SaveUserProps,
  SaveUserServiceProps,
} from "types/User";
import { ReferenceProps } from "views/addUser";
import { Query } from "appwrite";

export async function fetchAllUsers() {
  const data = await databases.listDocuments(DATABASE.id, TABLES.users.id);

  return data;
}
export async function addPartnerJob(values: JobProps) {
  const data = await databases.createDocument(
    DATABASE.id,
    TABLES.partner_job.id,
    UUID.generate(),
    values
  );

  return data;
}

export async function addUser(values: SaveUserServiceProps) {
  const data = await databases.createDocument(
    DATABASE.id,
    TABLES.users.id,
    UUID.generate(),
    values
  );

  return data;
}

export async function addReferences(values: ReferenceProps[], user_id: string) {
  await Promise.all(
    values?.map(async (reference) => {
      console.log(reference);

      await databases.createDocument(
        DATABASE.id,
        TABLES.partner_third_parties.id,
        UUID.generate(),
        { ...reference, user_id }
      );
    })
  );
}

export async function fetchUserById(id: string) {
  const data = await databases.getDocument(DATABASE.id, TABLES.users.id, id);

  return data;
}

export async function fetchAccountsByUserId(id: string) {
  const data = await databases.listDocuments(DATABASE.id, TABLES.accounts.id, [
    Query.equal("user_id", id),
  ]);

  return data;
}

export async function fetchUserByCard(card: string) {
  const data = await databases.listDocuments(DATABASE.id, TABLES.users.id, [
    Query?.equal("card", card),
  ]);

  return data;
}

export async function addTran(values: SaveTransactionProps) {
  const { account_id, total, type, currentTotal } = values;

  if (values?.type === "C") {
    await databases.createDocument(
      DATABASE.id,
      TABLES.accounts_transactions.id,
      UUID.generate(),
      {
        account_id,
        total,
        type,
        new_balance: values?.currentTotal + values?.total,
      }
    );
    await databases.updateDocument(
      DATABASE.id,
      TABLES.accounts.id,
      values?.account_id,
      { balance: values?.currentTotal + values?.total }
    );
    return;
  }
  await databases.createDocument(
    DATABASE.id,
    TABLES.accounts_transactions.id,
    UUID.generate(),
    {
      account_id,
      total,
      type,
      new_balance: values?.currentTotal - values?.total,
    }
  );
  await databases.updateDocument(
    DATABASE.id,
    TABLES.accounts.id,
    values?.account_id,
    { balance: values?.currentTotal - values?.total }
  );
}

export async function fetchAccountTransactions(id: string) {
  const data = await databases.listDocuments(
    DATABASE.id,
    TABLES.accounts_transactions.id,
    [Query.equal("account_id", id)]
  );

  return data;
}

export async function saveLoan(values: SaveLoanProps, userId: string) {
  const guarantorUid = UUID.generate();

  console.log(values);

  const { guarantor, ...formatedValues } = values;

  await databases.createDocument(
    DATABASE.id,
    "656d382b6571611c9bda",
    guarantorUid,
    { ...guarantor, card: guarantor?.card?.toString() }
  );

  const data = await databases.createDocument(
    DATABASE.id,
    TABLES.loans.id,
    UUID.generate(),
    {
      ...formatedValues,
      guarantor_id: guarantorUid,
      payDay: parseInt(values?.payDay),
      status_code: "P",
      user_id: userId,
    }
  );

  return data;
}

export async function fetchAccountLoans(id: string) {
  const data = await databases.listDocuments(DATABASE.id, TABLES.loans.id, [
    Query.equal("user_id", id),
  ]);

  return data;
}

export async function fetchLoanById(id: string) {
  const data = await databases.getDocument(DATABASE.id, TABLES.loans.id, id);
  return data;
}
export async function fetchLoanTransactions(id: string) {
  const data = await databases.listDocuments(
    DATABASE.id,
    "656e56c48c182a7f64a2",
    [Query.equal("loan_id", id)]
  );

  return data;
}

export async function saveLoanTransaction(values: SaveLoanTransactionProps) {
  const guarantorUid = UUID.generate();

  await databases.createDocument(
    DATABASE.id,
    "656e56c48c182a7f64a2",
    guarantorUid,
    values
  );
}

export async function signin(user: string) {
  console.log(user);
  
  const { documents } = await databases.listDocuments(
    DATABASE.id,
    "655f9da29f5488d854dc",
    [Query.equal("user", user)]
  );

  console.log(documents);
  

  return documents[0];
}

export async function fetchLoansForApprove() {
  const data = await databases.listDocuments(DATABASE.id, TABLES.loans.id);

  return data;
}