import {
  Flex,
  Box,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// Custom components
import Card from "components/card/Card";
import Menu, { MenuAtrr } from "components/menu/MainMenu";
import { useHistory } from "react-router-dom";
import { UserProps } from "types/User";
import { format } from "utils/helpers";
import { databases } from "lib/appwrite";
import { DATABASE, TABLES } from "constans/appwrite";
import Swal from "sweetalert2";

type RowObj = {
  user_id: string;
  total_borrowed: number;
  interest_rate: UserProps;
  time: number;
};

const columnHelper = createColumnHelper<RowObj>();

interface AtrrColumnTable {
  tableData: any;
  name?: string;
  menuProps?: MenuAtrr;
  loading?: boolean;
}

// const columns = columnsDataCheck;
export default function ColumnTable(props: AtrrColumnTable) {
  const history = useHistory();
  const [sorting, setSorting] = useState<SortingState>([]);

  const { tableData } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const data = useMemo(() => {
    return tableData;
  }, [tableData]);

  const columns = [
    columnHelper.accessor("user_id", {
      id: "user_id",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Pago
        </Text>
      ),
      cell: (info: any) => {
        const row = info?.row?.getVisibleCells()[0]?.row?.original;

        return (
          <Flex align="center">
            <Text
              color={textColor}
              fontSize="sm"
              fontWeight="700"
              style={{ color: row?.estapago ? "#27AE60" : "" }}
            >
              {/* {format.money(info.getValue())} */}
              {info?.getValue()?.name}
            </Text>
          </Flex>
        );
      },
    }),
    columnHelper.accessor("total_borrowed", {
      id: "total_borrowed",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Total Solicitado
        </Text>
      ),
      cell: (info) => {
        const date = new Date(info.getValue());
        const row: any = info?.row?.getVisibleCells()[0]?.row?.original;

        return (
          <Text
            color={textColor}
            fontSize="sm"
            style={{ color: row?.estapago ? "#27AE60" : "" }}
            fontWeight="700"
          >
            {/* {`${date?.getDate()} / ${
              date?.getMonth() || 12
            } / ${date?.getFullYear()}`} */}
            {format.money(info.getValue())}
          </Text>
        );
      },
    }),
    columnHelper.accessor("interest_rate", {
      id: "interest_rate",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Tasa de interés
        </Text>
      ),
      cell: (info) => {
        const row: any = info?.row?.getVisibleCells()[0]?.row?.original;
        return (
          <Text
            color={textColor}
            fontSize="sm"
            style={{ color: row?.estapago ? "#27AE60" : "" }}
            fontWeight="700"
          >
            {`${info.getValue()}%`}
          </Text>
        );
      },
    }),
    columnHelper.accessor("time", {
      id: "time",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Meses
        </Text>
      ),
      cell: (info) => {
        const row: any = info?.row?.getVisibleCells()[0]?.row?.original;
        return (
          <Text
            color={textColor}
            fontSize="sm"
            style={{ color: row?.estapago ? "#27AE60" : "" }}
            fontWeight="700"
          >
            {info.getValue()}
          </Text>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          {props?.name || "Lista"}
        </Text>
        <Menu {...props?.menuProps} />
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: "10px", lg: "12px" }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>

          {!props?.loading && (
            <Tbody>
              {table
                .getRowModel()
                .rows.slice(0, 11)
                .map((row: any) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell: any) => {
                        return (
                          <Td
                            key={cell.id}
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor="transparent"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        );
                      })}
                      <Td
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        <Menu
                          {...{
                            options: [
                              {
                                label: "Aprovar",
                                props: {
                                  onClick: () => {
                                    databases
                                      .updateDocument(
                                        DATABASE.id,
                                        TABLES.loans.id,
                                        row?.getVisibleCells()[0]?.row?.original
                                          ?.$id,
                                        { approved_at: new Date() }
                                      )
                                      .then(() => {
                                        Swal.fire({
                                          title: "Completado",
                                          text: "Prestamo aprovado, reinicia la pagina",
                                          icon: "success"
                                        });
                                      });
                                  },
                                },
                              },
                            ],
                          }}
                        />
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          )}
        </Table>

        {props?.loading && (
          <Center style={{ width: "100%" }}>
            <Spinner />
          </Center>
        )}
      </Box>
    </Card>
  );
}
