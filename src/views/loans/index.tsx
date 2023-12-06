import {
  Box,
  FormControl,
  Grid,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { DATABASE, TABLES } from "constans/appwrite";
import {
  useFetchAccountsByUserId,
  useFetchUserByCard,
  useFetchAccountTransactions,
  useFetchLoans,
  useFetchLoanTransactions,
  useFetchLoanById,
} from "hooks/useUser";
import { databases } from "lib/appwrite";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SaveLoanProps } from "types/User";
import ColumnsTable from "./components/table";

interface Payment {
  date: Date;
  amount: number;
  daysBeforeDue: number;
  daysAfterDue: number;
  restante: number;
  valorantes: number;
  estapago: boolean;
}

export default function Loans() {
  const history = useHistory();

  const [card, setCard] = useState("");
  const [account, setAccount] = useState("");
  const [cardToSend, setCardToSend] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<any>();

  const [user, userLoading] = useFetchUserByCard(cardToSend);
  const [loans, loansLoading] = useFetchLoans(user?.$id);
  const [transactions, transactionsLoading] = useFetchLoanTransactions(
    selectedLoan?.$id
  );

  const formatedLoan = useMemo(() => {
    return loans?.filter((loan) => loan?.approved_at);
  }, [loans]);

  const formatedTransactions = useMemo(() => {
    var totalPagado = 0;

    transactions?.forEach((data) => {
      totalPagado += data?.total;
    });

    const preformated = calculatePayments(
      selectedLoan?.time - transactions?.length,
      selectedLoan?.payDay,
      selectedLoan?.disbursemented_at,
      selectedLoan?.time,
      selectedLoan?.total_borrowed - totalPagado
    );

    return preformated;
  }, [transactions, selectedLoan]);

  function calculatePayments(
    remainingMonths: number,
    paymentDay: number,
    startDate: Date,
    totalMonths: number,
    totalAmount: number
  ): Payment[] {
    const payments: Payment[] = [];

    let restante = totalAmount;
    let valorantes = totalAmount;
    for (let i = 0; i < remainingMonths; i++) {
      const currentMonth = totalMonths - remainingMonths + i;
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + currentMonth);
      paymentDate.setDate(paymentDay);

      const daysBeforeDue = Math.max(
        0,
        Math.round((paymentDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      );

      const daysAfterDue = daysBeforeDue > 0 ? 0 : Math.abs(daysBeforeDue);

      const amount = totalAmount / remainingMonths;
      restante = restante - amount;

      const payment: Payment = {
        date: paymentDate,
        amount,
        daysBeforeDue,
        daysAfterDue,
        restante,
        valorantes,
        estapago: false,
      };
      valorantes = valorantes - amount;

      payments.push(payment);
    }

    return payments;
  }

  // Ej

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Box w="100%" h="10">
            <Input
              variant="filled"
              placeholder="Cédula"
              borderRadius="16px"
              onChange={({ target }) => {
                setCard(target?.value);
              }}
              onKeyDown={(event) => {
                if (event?.key === "Tab" || event?.key === "Enter") {
                  setCardToSend(card);
                }
              }}
              value={card}
            />
          </Box>
          <Box w="100%" h="10">
            <Input
              variant="filled"
              placeholder="Nombre"
              borderRadius="16px"
              disabled
              value={`${user?.name || ""} ${user?.lastname || ""}`}
            />
          </Box>
          <Box w="100%">
            <Select
              variant="filled"
              placeholder="Prestamo"
              borderRadius="16px"
              onChange={({ target }) => {
                setAccount(target?.value);
                setSelectedLoan(
                  formatedLoan?.find(({ $id }) => $id === target?.value)
                );
              }}
              value={account}
              disabled={!formatedLoan?.length}
            >
              {user &&
                formatedLoan?.map((account) => {
                  const date = new Date(account?.approved_at);
                  return (
                    <option
                      value={account?.$id}
                    >{`Prestamo ${date?.getDate()}/${date?.getMonth()}/${date?.getFullYear()}`}</option>
                  );
                })}
            </Select>
          </Box>
        </Grid>
        <ColumnsTable
          // loading={loading}
          menuProps={{
            options:
              user && selectedLoan?.disbursemented_at
                ? [
                    {
                      label: "Solicitar Prestamo",
                      props: {
                        onClick: () => {
                          history.push(`/admin/requestLoan/${user?.$id}`);
                        },
                      },
                    },
                    {
                      label: "Pagar Prestamo",
                      props: {
                        onClick: () => {
                          history.push(
                            `/admin/payLoan/${user?.$id}/${selectedLoan?.$id}`
                          );
                        },
                      },
                    },
                  ]
                : !selectedLoan?.disbursemented_at && user
                ? [
                    {
                      label: "Desembolsar prestamo",
                      props: {
                        onClick: () => {
                          databases
                            .updateDocument(
                              DATABASE.id,
                              TABLES.loans.id,
                              selectedLoan?.$id,
                              { disbursemented_at: new Date() }
                            )
                            .then(() => {
                              setSelectedLoan({
                                ...selectedLoan,
                                disbursemented_at: new Date()?.toString(),
                              });
                            });
                        },
                      },
                    },
                    {
                      label: "Solicitar Prestamo",
                      props: {
                        onClick: () => {
                          history.push(`/admin/requestLoan/${user?.$id}`);
                        },
                      },
                    },
                  ]
                : [],
          }}
          name="Transacciones"
          tableData={[
            ...transactions?.map((data) => {
              const date = new Date(data?.$createdAt);
              date?.setMonth(date?.getMonth() + 1)

              return {
                date:date,
                amount: data?.total,
                valorantes: data?.valorantes,
                restante: data?.restante,
                estapago: true,
              };
            }),
            ...formatedTransactions,
          ]}
        />
      </SimpleGrid>
    </Box>
  );
}
