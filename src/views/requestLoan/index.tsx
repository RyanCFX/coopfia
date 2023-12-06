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
import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "utils/helpers";
import { useAddLoan, useFetchUserById } from "../../hooks/useUser";

export default function RequestLoan() {
  const params = useParams<{ id: string }>();
  const [user, userLoading] = useFetchUserById(params?.id);

  const [handleAddTran, loading, error] = useAddLoan();

  return (
    <Box id="addUser" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <Formik
          // validate={validateForm}
          validateOnChange={false}
          initialValues={{
            total_borrowed: "",
            time: 0,
            interest_rate: 2,
            payDay: "",
            guarantor: {
              card: "",
              name: "",
              lastname: "",
              bussiness: "",
              profession: "",
              salary: "",
              phone: "",
            },
          }}
          onSubmit={(values: any) => {
            handleAddTran(values, user?.$id, () => {
              Swal.fire({
                title: "Completado",
                text: "El prestamo ha sido solitado.",
                icon: "success",
              });
              // history.push("/admin/users");
            });
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
                <h1>Prestamo</h1>
                <Divider className="divider" />
              </Box>

              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Monto"
                  borderRadius="16px"
                  onChange={handleChange("total_borrowed")}
                  value={values?.total_borrowed}
                  type="number"
                />
              </Box>

              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Tasa de interes aproximada"
                  borderRadius="16px"
                  onChange={handleChange("interest_rate")}
                  value={values?.interest_rate}
                  disabled
                />
              </Box>

              <Box w="100%" h="10">
                <Select
                  variant="filled"
                  placeholder="Plazo (meses)"
                  borderRadius="16px"
                  onChange={({ target }) => {
                    setFieldValue("time", target?.value);
                  }}
                  value={values?.time}
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={32}>32</option>
                  <option value={48}>48</option>
                  <option value={60}>60</option>
                </Select>
              </Box>
              <Box w="100%" h="10">
                <Select
                  variant="filled"
                  placeholder="Día de pago"
                  borderRadius="16px"
                  onChange={({ target }) => {
                    setFieldValue("payDay", target?.value);
                  }}
                  value={values?.payDay}
                >
                  {Array.from(Array(30))?.map((_, i) => (
                    <option value={i + 1}>{i + 1}</option>
                  ))}
                </Select>
              </Box>
              {/* 

              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Correo electrónico"
                  borderRadius="16px"
                  onChange={handleChange("partner_job.email")}
                  value={values?.partner_job.email}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Sueldo"
                  borderRadius="16px"
                  type="number"
                  onChange={handleChange("partner_job.salary")}
                  value={values?.partner_job.salary}
                />
              </Box> */}
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Garante</h1>
                <Divider className="divider" />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Cédula"
                  borderRadius="16px"
                  type="number"
                  onChange={handleChange("guarantor.card")}
                  value={values?.guarantor.card}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Nombre"
                  borderRadius="16px"
                  onChange={handleChange("guarantor.name")}
                  value={values?.guarantor.name}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Apellido"
                  borderRadius="16px"
                  onChange={handleChange("guarantor.lastname")}
                  value={values?.guarantor.lastname}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Ingresos"
                  borderRadius="16px"
                  onChange={handleChange("guarantor.salary")}
                  value={values?.guarantor.salary}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Empresa"
                  borderRadius="16px"
                  onChange={handleChange("guarantor.bussiness")}
                  value={values?.guarantor.bussiness}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Profesion"
                  borderRadius="16px"
                  onChange={handleChange("guarantor.profession")}
                  value={values?.guarantor.profession}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Teléfono"
                  borderRadius="16px"
                  onChange={handleChange("guarantor.phone")}
                  value={values?.guarantor.phone}
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
