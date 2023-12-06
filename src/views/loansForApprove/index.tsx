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
  useFetchLoansForApprove,
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

export default function LoansForApprove() {
  const history = useHistory();

  const [card, setCard] = useState("");
  const [account, setAccount] = useState("");
  const [cardToSend, setCardToSend] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<any>();

  const [user, userLoading] = useFetchUserByCard(cardToSend);
  const [loans, loansLoading] = useFetchLoansForApprove();

  const formatedLoans = useMemo(() => {
    return loans?.filter((loan) => !loan?.approved_at);
  }, [loans]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <ColumnsTable
          // loading={loading}
          menuProps={{
            options: [],
          }}
          name="Prestamos"
          tableData={formatedLoans}
        />
      </SimpleGrid>
    </Box>
  );
}
