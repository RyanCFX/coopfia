import { Box, SimpleGrid } from "@chakra-ui/react";
import { useFetchAccountsByUserId } from "hooks/useUser";
import React from "react";
import { useParams } from "react-router-dom";
import ColumnsTable from "./components/table";

export default function Accounts() {
  const params = useParams<{ id: string }>();
  const [accounts, loading, error] = useFetchAccountsByUserId(params?.id);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <ColumnsTable
          // loading={loading}
          menuProps={{
            options: [
              {
                label: "Agregar socio",
                props: {
                  onClick: () => {
                    //   history.push("/admin/addUser");
                  },
                },
              },
            ],
          }}
          name="Lista de socios"
          tableData={accounts}
        />
      </SimpleGrid>
    </Box>
  );
}
