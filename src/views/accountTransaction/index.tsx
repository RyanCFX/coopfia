import {
  Box,
  FormControl,
  Grid,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  useFetchAccountsByUserId,
  useFetchUserByCard,
  useFetchAccountTransactions,
} from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnsTable from "./components/table";

export default function AccountTransactions() {
  const params = useParams<{ id: string }>();

  const [card, setCard] = useState("");
  const [account, setAccount] = useState("");
  const [cardToSend, setCardToSend] = useState("");

  const [user, userLoading] = useFetchUserByCard(card);
  const [accounts, loading, error] = useFetchAccountsByUserId(user?.$id);
  const [transactions, transactionsLoading] =
    useFetchAccountTransactions(account);

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
              placeholder="Cuenta"
              borderRadius="16px"
              onChange={({ target }) => {
                setAccount(target?.value);
              }}
              value={account}
              disabled={!accounts?.length}
            >
              {user &&
                accounts?.map((account) => (
                  <option value={account?.$id}>{account?.number}</option>
                ))}
            </Select>
          </Box>
        </Grid>
        <ColumnsTable
          // loading={loading}
          // menuProps={{
          //   options: [
          //     {
          //       label: "Agregar socio",
          //       props: {
          //         onClick: () => {
          //           //   history.push("/admin/addUser");
          //         },
          //       },
          //     },
          //   ],
          // }}
          name="Transacciones"
          tableData={transactions}
        />
      </SimpleGrid>
    </Box>
  );
}
