import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useFetchUserById } from "hooks/useUser";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format } from "utils/helpers";

export default function UserInformation() {
  const params = useParams<{ id: string }>();
  const [user, loading, error] = useFetchUserById(params?.id);

  useEffect(() => {
    console.log(user);
  }, [user]);

  //   console.log(location.pathname);

  return (
    <Box id="userInformation" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Box w="100%" h="10" gridColumn="1/4">
            <h1>Información personal</h1>
            <Divider className="divider" />
          </Box>
          <FormControl>
            <FormLabel>Cédula</FormLabel>
            <Input
              variant="filled"
              placeholder="Cédula"
              borderRadius="16px"
              readOnly
              value={user?.card}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              variant="filled"
              placeholder="Nombre"
              borderRadius="16px"
              readOnly
              value={user?.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Apellido</FormLabel>
            <Input
              variant="filled"
              placeholder="Apellido"
              borderRadius="16px"
              readOnly
              value={user?.lastname}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              variant="filled"
              placeholder="Correo electrónico"
              borderRadius="16px"
              readOnly
              value={user?.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Estado civil</FormLabel>
            <Input
              variant="filled"
              placeholder="marital_status"
              borderRadius="16px"
              readOnly
              value={format.maritalStatus(user?.marital_status)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Estado civil</FormLabel>
            <Input
              variant="filled"
              placeholder="Estado civil"
              borderRadius="16px"
              readOnly
              value={format.maritalStatus(user?.marital_status)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nacionalidad</FormLabel>
            <Input
              variant="filled"
              placeholder="Nacionalidad"
              borderRadius="16px"
              readOnly
              value={user?.country_id?.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Genero</FormLabel>
            <Input
              variant="filled"
              placeholder="Genero"
              borderRadius="16px"
              readOnly
              value={user?.marital_status_code}
            />
          </FormControl>
        </Grid>
      </SimpleGrid>
    </Box>
  );
}
