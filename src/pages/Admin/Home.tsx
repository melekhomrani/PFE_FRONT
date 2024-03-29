import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import useGetAllReclamations from "../../hooks/useGetAllReclamations";
import useGetAllTypes from "../../hooks/useGetAllTypes";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useIsAdmin from "../../hooks/useIsAdmin";
import useGetUserRole from "../../hooks/useGetUserRole";

const Admin = () => {
  const { isLoading: isLoadingUsers, isSuccess: isSuccessUsers, data: users } = useGetAllUsers();
  let { isLoading: isLoadingRoles, isSuccess: isSuccessRoles, data: roles } = useGetAllRoles();

  let { isLoading: isLoadingReclamations, data: reclamations } = useGetAllReclamations();
  let { isLoading: isLoadingTypes, data: types } = useGetAllTypes();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const limit = 4;

  if (!isLoadingRoles && !isLoadingUsers && isSuccessRoles && isSuccessUsers) {
    roles = roles.map((r: any) => {
      const count = users.filter((u: any) => u.role.name === r.name).length;
      return { ...r, count };
    });
  }

  if (!isLoadingReclamations && !isLoadingTypes && reclamations && types) {
    types = types.map((r: any) => {
      const count = reclamations.filter((u: any) => u.type.typeName === r.typeName).length;
      return { ...r, count };
    });
    types = types.sort((a: any, b: any) => b.count - a.count);
  }

  if (!isLoadingTypes && !isLoadingRoles) {
    const count = roles.length > types.length ? roles.length : types.length;
    for (let i = 0; i < count; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      COLORS.push(color);
    }
  }
  return (
    <Box p={6}>
      {!isLoadingUsers && !isLoadingReclamations && !isLoadingRoles && !isLoadingTypes &&
        <>
          <Heading mb={6}>Dashboard</Heading>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
            <Stat>
              <StatLabel>Number of users</StatLabel>
              <StatNumber>{users.length}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Number of reclamations</StatLabel>
              <StatNumber>{reclamations.length}</StatNumber>
            </Stat>
          </SimpleGrid>
          <Flex mb={12}>
            <Flex justify={"stretch"} align="stretch" direction={"column"} bgColor={""} flex="1" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Box bg="gray.100" p="6" borderBottomWidth="1px">
                <Heading fontSize="xl">Reclamations by type</Heading>
              </Box>
              <Flex justify={"center"} p="6">
                <PieChart width={400} height={300}>
                  <Pie
                    dataKey="count"
                    isAnimationActive
                    data={types}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {types.map((entry: any, index: any) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.typeName} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend payload={types.filter((entry: any, index: any) => index < limit)
                    .map((entry: any, index: any) => {
                      console.log(entry)
                      return {
                        id: entry.id,
                        value: `${entry.typeName}`,
                        type: "square",
                        color: COLORS[index % COLORS.length],
                      }
                    })}
                  />
                </PieChart>
              </Flex>
            </Flex>
            <Box ml={6} flex="1" borderWidth="1px " borderRadius="lg" overflow="hidden">
              <Box bg="gray.100" p="6" borderBottomWidth="1px">
                <Heading fontSize="xl">Users by role</Heading>
              </Box>
              <Flex justify={"center"} p="6">
                <PieChart width={400} height={300}>
                  <Pie
                    dataKey="count"
                    isAnimationActive
                    data={roles}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {roles.map((entry: any, index: any) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend payload={roles.filter((entry: any, index: any) => index < limit)
                    .map((entry: any, index: any) => {
                      return {
                        id: entry.id,
                        value: `${entry.name}`,
                        type: "square",
                        color: COLORS[index % COLORS.length],
                      }
                    })} />
                </PieChart>
              </Flex>
            </Box>
          </Flex>
        </>}
    </Box>

  );
};

export default Admin;