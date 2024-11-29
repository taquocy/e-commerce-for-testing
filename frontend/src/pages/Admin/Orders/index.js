import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchOrders, updateOrder } from "../../../api";

function Orders() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    "admin:orders",
    fetchOrders
  );

  const updateOrderMutation = useMutation(updateOrder, {
    onSuccess: () => queryClient.invalidateQueries("admin:orders"),
  });

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [updatedAddress, setUpdatedAddress] = useState("");

  const handleEditClick = (orderId, currentAddress) => {
    setEditingOrderId(orderId);
    setUpdatedAddress(currentAddress);
  };

  const handleSaveClick = (orderId) => {
    updateOrderMutation.mutate(
      { address: updatedAddress },
      {
        onSuccess: () => {
          setEditingOrderId(null);
          setUpdatedAddress("");
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  console.log(data);
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Order</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Box mt={10}>
        <Text fontSize="2xl" p={5}>
          Orders
        </Text>

        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Users</Th>
              <Th>Address</Th>
              <Th>Items</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                {item.user === null ? (
                  <Td>No Name</Td>
                ) : (
                  <Td>{item.user.email}</Td>
                )}
                <Td>
                  {editingOrderId === item._id ? (
                    <Input
                      value={updatedAddress}
                      onChange={(e) => setUpdatedAddress(e.target.value)}
                    />
                  ) : (
                    item.adress
                  )}
                </Td>
                <Td isNumeric>{item.items.length}</Td>
                <Td>
                  {editingOrderId === item._id ? (
                    <Button
                      colorScheme="teal"
                      onClick={() => handleSaveClick(item._id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      colorScheme="teal"
                      onClick={() => handleEditClick(item._id, item.adress)}
                    >
                      Edit
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
}

export default Orders;
