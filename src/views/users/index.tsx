import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { databases } from "lib/appwrite";
import { useFetchAllUsers } from "hooks/useUser";
import { format } from "utils/helpers";
import { useHistory } from "react-router-dom";
import ColumnsTable from "./components/ColumnsTable";

export default function Users() {
  const history = useHistory();
  const [users, loading, error] = useFetchAllUsers();

  useEffect(() => {
    // console.log(users);
  }, [users]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <ColumnsTable
          loading={loading}
          menuProps={{
            options: [
              {
                label: "Agregar socio",
                props: {
                  onClick: () => {
                    history.push("/admin/addUser");
                  },
                },
              },
            ],
          }}
          name="Lista de socios"
          tableData={users?.map((user) => ({
            ...user,
            name: `${user?.name?.split(" ")[0]} ${user?.lastname}`,
            card: format.cardId(user?.card),
            phone: format.phone(user?.phone),
          }))}
        />
      </SimpleGrid>
    </Box>
  );
}
