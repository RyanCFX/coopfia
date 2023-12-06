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

type RowObj = {
  number: string;
  balance: number;
  user_id: UserProps;
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
    columnHelper.accessor("number", {
      id: "number",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Número de cuenta
        </Text>
      ),
      cell: (info: any) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor("balance", {
      id: "balance",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Balance
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("user_id", {
      id: "user_id",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          Socio
        </Text>
      ),
      cell: (info) => {
        const user = info.row?.original?.user_id;
        return (
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {`${user?.name} ${user?.lastname}`}
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
                                label: "Ver socio",
                                props: {
                                  onClick: () => {
                                    history.push(
                                      `/admin/userInformation/${
                                        row.getVisibleCells()[0]?.row
                                          ?.original?.["$id"]
                                      }`
                                    );
                                  },
                                },
                              },
                              {
                                label: "Ver cuentas",
                                props: {
                                  onClick: () => {
                                    history.push(
                                      `/admin/accounts/${
                                        row.getVisibleCells()[0]?.row
                                          ?.original?.["$id"]
                                      }`
                                    );
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
