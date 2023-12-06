import React, { useState } from "react";
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
import { useAddUser } from "hooks/useUser";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

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

export default function AddUser() {
  const history = useHistory()
  const [form, setForm] = useState<FormProps>({});
  const [references, setReferences] = useState<ReferenceProps[]>([]);

  const [provinces, provincesLoading] = useFetchAllProvinces();
  const [sectors, sectorsLoading] = useFetchSectorsByProvince(form?.province);
  const [professions, professionsloading] = useFetchAllProfessions();
  const [relationships, relationsLoading] = useFetchAllRelationships();
  const [countries, countriesLoading] = useFetchAllCountries();
  const [handleAddUser, loading, error] = useAddUser();

  const handleForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // const validateForm = async (values: any) => {
  //   const { partner_job, ...valuesWithoutJob } = values;

  //   const errors = await validationSchema
  //     ?.validate(valuesWithoutJob)
  //     ?.then(() => undefined)
  //     ?.catch((error) => {
  //       console.log('error');
  //       console.log(error);
  //       console.log('error');

  //       return error;
  //     });

  //   // console.log(errors);
  //   if (errors) {
  //     return errors;
  //   }

  //   // return await carValidationSchema
  //   //   ?.validate(car)
  //   //   ?.then(() => undefined)
  //   //   ?.catch((error) => {
  //   //     ModalOpener$.next({
  //   //       name: "FORM_ERROR",
  //   //       extra: { description: error?.message },
  //   //     });
  //   //     return error;
  //   //   });
  // };

  return (
    <Box id="addUser" pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid spacing={{ base: "20px", xl: "20px" }}>
        <Formik
          // validate={validateForm}
          validateOnChange={false}
          initialValues={{
            card: "",
            name: "",
            lastname: "",
            marital_status_code: "",
            country_id: "",
            others_salaries: 0,
            others_salaries_justification: "",
            province_id: "",
            sector_id: "",
            address: "",
            phone: "",
            email: "",
            gender_code: "",
            real_state_status_code: "",
            partner_job: {
              position: "",
              bussiness_name: "",
              address: "",
              entry_date: "",
              phone: "",
              email: "",
              salary: 0,
            },
          }}
          onSubmit={(values: any) => {
            handleAddUser(values, references, () => {
              Swal.fire({
                title: "Completado",
                text: "El socio ha sido agregado con exito",
                icon: "success"
              });
              history.push("/admin/users")
              
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
                <FormControl isInvalid={!!errors?.card}>
                  <Input
                    variant="filled"
                    placeholder="Cédula"
                    borderRadius="16px"
                    onChange={handleChange("card")}
                    value={values?.card}
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
                  onChange={handleChange("name")}
                  value={values?.name}
                />
                {/* </FormControl> */}
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.lastname}>
                  <Input
                    variant="filled"
                    placeholder="Apellido"
                    borderRadius="16px"
                    onChange={handleChange("lastname")}
                    value={values?.lastname}
                  />
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.marital_status_code}>
                  <Select
                    variant="filled"
                    placeholder="Estado civil"
                    borderRadius="16px"
                    onChange={handleChange("marital_status_code")}
                    value={values?.marital_status_code}
                  >
                    <option value="S">Soltero</option>
                    <option value="C">Casado</option>
                    <option value="U">Unión Libre</option>
                  </Select>
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.country_id}>
                  <Select
                    variant="filled"
                    placeholder="Nacionalidad"
                    borderRadius="16px"
                    onChange={handleChange("country_id")}
                    value={values?.country_id}
                  >
                    {countries.map((country) => (
                      <option value={country["$id"]}>{country?.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.gender_code}>
                  <Select
                    variant="filled"
                    placeholder="Genero"
                    borderRadius="16px"
                    onChange={handleChange("gender_code")}
                    value={values?.gender_code}
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </Select>
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.phone}>
                  <Input
                    variant="filled"
                    placeholder="Teléfono"
                    borderRadius="16px"
                    onChange={handleChange("phone")}
                    value={values?.phone}
                  />
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.email}>
                  <Input
                    variant="filled"
                    placeholder="Correo electrónico"
                    borderRadius="16px"
                    onChange={handleChange("email")}
                    value={values?.email}
                  />
                </FormControl>
              </Box>
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Ubicación</h1>
                <Divider className="divider" />
              </Box>
              <Box w="100%" h="10" gridColumn="1/3">
                <FormControl isInvalid={!!errors?.address}>
                  <Input
                    variant="filled"
                    placeholder="Dirección"
                    borderRadius="16px"
                    onChange={handleChange("address")}
                    value={values?.address}
                  />
                </FormControl>
              </Box>
              <Box w="100%" h="10">
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
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.sector_id}>
                  <Select
                    disabled={!sectors?.length || sectorsLoading}
                    variant="filled"
                    placeholder="Sector"
                    borderRadius="16px"
                    onChange={handleChange("sector_id")}
                    value={values?.sector_id}
                  >
                    {sectors.map((sector) => (
                      <option>{sector?.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box w="100%" h="10">
                <FormControl isInvalid={!!errors?.real_state_status_code}>
                  <Select
                    variant="filled"
                    placeholder="Estatus de la vivienda"
                    borderRadius="16px"
                    onChange={handleChange("real_state_status_code")}
                    value={values?.real_state_status_code}
                  >
                    <option value="P">Propia</option>
                    <option value="A">Alquilada</option>
                    <option value="F">Familiar</option>
                  </Select>
                </FormControl>
              </Box>
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Trabajo</h1>
                <Divider className="divider" />
              </Box>
              <Box w="100%" h="10">
                <Select
                  variant="filled"
                  placeholder="Profesión"
                  borderRadius="16px"
                  onChange={handleChange("partner_job.position")}
                  value={values?.partner_job.position}
                >
                  {professions?.map((profession) => (
                    <option value={profession.$id}>{profession.name}</option>
                  ))}
                  <option value={null}>Otro...</option>
                </Select>
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Empresa"
                  borderRadius="16px"
                  onChange={handleChange("partner_job.bussiness_name")}
                  value={values?.partner_job.bussiness_name}
                />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Fecha de ingreso"
                  borderRadius="16px"
                  type="date"
                  onChange={handleChange("partner_job.entry_date")}
                  value={values?.partner_job.entry_date}
                />
              </Box>
              <Box w="100%" h="10" gridColumn="1/3">
                <Input
                  variant="filled"
                  placeholder="Dirección"
                  borderRadius="16px"
                  onChange={handleChange("partner_job.address")}
                  value={values?.partner_job.address}
                />
              </Box>

              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Teléfono"
                  borderRadius="16px"
                  onChange={handleChange("partner_job.phone")}
                  value={values?.partner_job.phone}
                />
              </Box>

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
              </Box>
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Ingresos extra</h1>
                <Divider className="divider" />
              </Box>
              <Box w="100%" h="10">
                <Input
                  variant="filled"
                  placeholder="Otros ingresos"
                  borderRadius="16px"
                  type="number"
                  onChange={handleChange("others_salaries")}
                  value={values?.others_salaries}
                />
              </Box>
              <Box w="100%" h="10" gridColumn="2/4">
                <Input
                  variant="filled"
                  placeholder="Fuente de ingreso"
                  borderRadius="16px"
                  onChange={handleChange("others_salaries_justification")}
                  value={values?.others_salaries_justification}
                />
              </Box>
              <Box w="100%" h="10" gridColumn="1/4">
                <h1>Referencias Personales</h1>
                <Divider className="divider" />
              </Box>
              <Box w="100%" gridColumn="1/4">
                {references?.map((relation, index) => (
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <Box w="100%" h="10">
                      <Input
                        variant="filled"
                        placeholder="Nombre"
                        borderRadius="16px"
                        readOnly
                        value={relation.name}
                      />
                    </Box>
                    <Box w="100%" h="10">
                      <Input
                        variant="filled"
                        placeholder="Apellido"
                        borderRadius="16px"
                        readOnly
                        value={relation.lastname}
                      />
                    </Box>
                    <Box w="100%" h="10">
                      <Input
                        variant="filled"
                        placeholder="Teléfono"
                        borderRadius="16px"
                        readOnly
                        value={relation.phone}
                      />
                    </Box>
                    <Box w="100%" h="10">
                      <Input
                        variant="filled"
                        placeholder="Correo electrónico"
                        borderRadius="16px"
                        readOnly
                        value={relation.email}
                      />
                    </Box>
                    <Box w="100%" h="10">
                      <Select
                        variant="filled"
                        placeholder="Relación"
                        borderRadius="16px"
                        value={relation.relationship_id}
                        disabled
                      >
                        {relationships?.map((relation) => (
                          <option value={relation.$id}>{relation.name}</option>
                        ))}
                      </Select>
                    </Box>
                    <Box w="100%" h="10">
                      <Button
                        onClick={() => {
                          const newReferences = references?.filter(
                            (reference, i) => index !== i
                          );

                          setReferences(newReferences);
                        }}
                        variant="brand"
                        background="#C0392B"
                      >
                        Eliminar
                      </Button>
                    </Box>
                    <Box w="100%" gridColumn="1/4" style={{ marginBottom: 20 }}>
                      <Divider />
                    </Box>
                  </Grid>
                ))}
              </Box>

              <Box w="100%" gridColumn="1/4">
                <Formik
                  initialValues={{
                    name: "",
                    lastname: "",
                    phone: "",
                    email: "",
                    relationship_id: "",
                  }}
                  onSubmit={(values) => {
                    setReferences([...references, values]);
                  }}
                >
                  {({ values, handleChange, handleSubmit, handleReset }) => (
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                      <Box w="100%" h="10">
                        <Input
                          variant="filled"
                          placeholder="Nombre"
                          borderRadius="16px"
                          onChange={handleChange("name")}
                          value={values.name}
                        />
                      </Box>
                      <Box w="100%" h="10">
                        <Input
                          variant="filled"
                          placeholder="Apellido"
                          borderRadius="16px"
                          onChange={handleChange("lastname")}
                          value={values.lastname}
                        />
                      </Box>
                      <Box w="100%" h="10">
                        <Input
                          variant="filled"
                          placeholder="Teléfono"
                          borderRadius="16px"
                          onChange={handleChange("phone")}
                          value={values.phone}
                        />
                      </Box>
                      <Box w="100%" h="10">
                        <Input
                          variant="filled"
                          placeholder="Correo electrónico"
                          borderRadius="16px"
                          onChange={handleChange("email")}
                          value={values.email}
                        />
                      </Box>
                      <Box w="100%" h="10">
                        <Select
                          variant="filled"
                          placeholder="Relación"
                          borderRadius="16px"
                          onChange={handleChange("relationship_id")}
                          value={values.relationship_id}
                        >
                          {relationships?.map((relation) => (
                            <option value={relation.$id}>
                              {relation.name}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      <Box w="100%" h="10">
                        <Button
                          onClick={() => {
                            handleSubmit();
                            setTimeout(() => {
                              handleReset();
                            }, 300);
                          }}
                          variant="brand"
                        >
                          Agregar
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Formik>
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
