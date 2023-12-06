import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "utils/helpers";
import {
  useAddLoan,
  useAddLoanTransaction,
  useFetchLoanById,
  useFetchLoans,
  useFetchLoanTransactions,
  useFetchUserById,
} from "../../hooks/useUser";

export default function PayLoan() {
  const params = useParams<{ userId: string; loanId: string }>();
  const history = useHistory();

  const [user, userLoading] = useFetchUserById(params?.userId);
  const [transactions, loansLoading] = useFetchLoanTransactions(params?.loanId);

  const [handleAddTran, loading, error] = useAddLoanTransaction();
  const [loan] = useFetchLoanById(params?.loanId);

  const totalPagado = useMemo(() => {
    var prePagado = 0;

    transactions?.forEach((data) => {
      prePagado += data?.total;
    });

    return prePagado;
  }, [transactions]);

  return (
    <Box id="addUser" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <Formik
          // validate={validateForm}
          validateOnChange={false}
          initialValues={{
            total: "",
          }}
          onSubmit={(values: any) => {
            handleAddTran(
              {
                loan_id: params?.loanId,
                total: values?.total,
                restante: loan?.total_borrowed - totalPagado - values?.total,
                valorantes: loan?.total_borrowed - totalPagado,
              },
              () => {
                Swal.fire({
                  title: "Completado",
                  text: "El prestamo ha sido solitado.",
                  icon: "success",
                });
                history.push("/admin/loans");
              }
            );

            // handleAddTran(values, user?.$id, () => {

            // });
          }}
        >
          {({ setFieldValue, values, handleSubmit, errors, handleChange }) => (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Información personal</h1>
                <Divider className="divider" />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Cédula"
                  borderRadius="16px"
                  value={format.cardId(user?.card)}
                  disabled
                />
              </Box>
              <Box w="100%" h="10">
                {/* <FormControl isInvalid={!!errors?.name}> */}
                <Input
                  variant="filled"
                  placeholder="Nombre"
                  borderRadius="16px"
                  value={user?.name}
                  disabled
                />
                {/* </FormControl> */}
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Apellido"
                  borderRadius="16px"
                  value={user?.lastname}
                  disabled
                />
              </Box>

              {/* <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.province_id}>
                  <Select
                    variant="filled"
                    placeholder="Provincia"
                    borderRadius="16px"
                    onChange={({ target }) => {
                      setFieldValue("province_id", target?.value);
                      handleForm("province", target?.value);
                    }}
                    value={values?.province_id}
                  >
                    {provinces.map((province) => (
                      <option value={province["$id"]}>{province?.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Box> */}

              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Pago</h1>
                <Divider className="divider" />
              </Box>

              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Monto"
                  borderRadius="16px"
                  onChange={handleChange("total")}
                  value={values?.total}
                  type="number"
                />
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
                  variant="brand"
                  isLoading={loading}
                >
                  Guardar
                </Button>
                <Button>Cancelar</Button>
              </Box>
            </Grid>
          )}
        </Formik>
      </SimpleGrid>
    </Box>
  );
}
