import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  Select,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

import "./styles.scss";

import {
  useFetchAllCountries,
  useFetchAllProvinces,
  useFetchSectorsByProvince,
} from "hooks/useLocation";
import { useFetchAllProfessions } from "hooks/useProfession";
import Loading from "components/loading";
import { useFetchAllRelationships } from "hooks/useRelationship";
import { Formik } from "formik";
import {
  useAddTransaction,
  useAddUser,
  useFetchAccountsByUserId,
  useFetchAllUsers,
  useFetchUserByCard,
  useFetchUserById,
} from "hooks/useUser";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Models } from "appwrite";

interface FormProps {
  province?: string;
}

export interface ReferenceProps {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  relationship_id: string;
}

export default function Transaction() {
  const history = useHistory();
  const [form, setForm] = useState<FormProps>({});
  const [formatedUser, setFormatedUser] = useState<Models.Document>();

  const [card, setCard] = useState("");

  const [user, userLoading] = useFetchUserByCard(card);
  const [accounts, accountsLoading] = useFetchAccountsByUserId(user?.$id);
  const [handleAddTran, loading] = useAddTransaction();

  useEffect(() => {
    setFormatedUser(user);
  }, [user]);

  const handleForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Box id="addUser" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <Formik
          // validate={validateForm}
          validateOnChange={false}
          initialValues={{
            card: "",
            user_id: "",
            total: 0,
            type: "",
            account_id: "",
          }}
          onSubmit={(values: any, functs: any) => {
            handleAddTran(
              {
                ...values,
                currentTotal: accounts?.find(
                  ({ $id }) => $id === values?.account_id
                )?.balance,
              },
              () => {
                functs?.resetForm();
                setCard("");
                Swal.fire({
                  title: "Completado",
                  text: "La transacción ha sido realizada",
                  icon: "success",
                });
              }
            );
          }}
        >
          {({
            setFieldValue,
            values,
            handleSubmit,
            errors,
            resetForm,
            handleChange,
            setFieldError,
          }) => (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Realizar</h1>
                <Divider className="divider" />
              </Box>

              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.card}>
                  <Input
                    variant="filled"
                    placeholder="Cédula"
                    borderRadius="16px"
                    onChange={handleChange("card")}
                    value={values?.card}
                    onKeyDown={(event) => {
                      if (event?.key === "Tab" || event?.key === "Enter") {
                        setCard(values?.card);
                      }
                    }}
                  />
                  <FormErrorMessage>{errors.card}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                {/* <FormControl isInvalid={!!errors?.name}> */}
                <Input
                  variant="filled"
                  placeholder="Nombre"
                  borderRadius="16px"
                  value={user?.name || ""}
                  disabled
                />
                {/* </FormControl> */}
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Apellido"
                  borderRadius="16px"
                  value={user?.lastname || ""}
                  disabled
                />
              </Box>
              <Box w="100%">
                <FormControl isInvalid={!!errors?.account_id}>
                  <Select
                    variant="filled"
                    placeholder="Cuenta"
                    borderRadius="16px"
                    onChange={handleChange("account_id")}
                    value={values?.account_id}
                    disabled={!accounts?.length}
                  >
                    {user &&
                      accounts?.map((account) => (
                        <option value={account?.$id}>{account?.number}</option>
                      ))}
                  </Select>
                  {user && values?.account_id && (
                    <span>{`Total de cuenta: ${
                      accounts?.find(({ $id }) => $id === values?.account_id)
                        ?.balance
                    }`}</span>
                  )}
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.total}>
                  <Input
                    variant="filled"
                    placeholder="Total"
                    borderRadius="16px"
                    value={values?.total}
                    onChange={({ target }) => {
                      if (!target?.value) {
                        setFieldValue("total", 0);
                      }
                      setFieldValue("total", target?.value);

                      if (
                        target?.value >
                          accounts?.find(
                            ({ $id }) => $id === values?.account_id
                          )?.balance &&
                        values?.type === "D"
                      ) {
                        setFieldError("total", "error");
                      } else {
                        setFieldError("total", "");
                      }
                    }}
                    type="number"
                  />
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.type}>
                  <Select
                    variant="filled"
                    placeholder="Tipo de transacción"
                    borderRadius="16px"
                    onChange={({ target }) => {
                      setFieldValue("type", target?.value);
                      if (
                        target?.value === "D" &&
                        values?.total >
                          accounts?.find(
                            ({ $id }) => $id === values?.account_id
                          )?.balance
                      ) {
                        setFieldError("total", "error");
                      } else {
                        setFieldError("total", "");
                      }
                    }}
                    value={values?.type}
                  >
                    <option value="C">Crédito</option>
                    <option value="D">Débito</option>
                  </Select>
                </FormControl>
              </Box>
              <Box
                w="100%"
                h="10"
                gridColumn="1/4"
                style={{ display: "flex", gap: 20 }}
              >
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  isLoading={loading}
                  variant="brand"
                  disabled={
                    !values?.account_id || !values?.total || !values?.type
                  }
                >
                  Guardar
                </Button>
                <Button
                  onClick={() => {
                    resetForm();
                    setCard("");
                  }}
                >
                  Cancelar
                </Button>
              </Box>
            </Grid>
          )}
        </Formik>
      </SimpleGrid>
    </Box>
  );
}

const validationSchema = yup.object({
  card: yup.string().required(),
  name: yup.string().required(),
  lastname: yup.string().required(),
  marital_status_code: yup.string().required(),
  country_id: yup.string().required(),
  others_salaries: yup.number().required(),
  others_salaries_justification: yup.string().required(),
  province_id: yup.string().required(),
  sector_id: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  gender_code: yup.string().required(),
  real_state_status_code: yup.string().required(),
});
