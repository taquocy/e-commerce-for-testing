import React, { useState } from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button, Input, Select } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";

function Products() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["products", search, filter],
    ({ pageParam = 1 }) => fetchProductList({ pageParam, search, filter }),
    {
      getNextPageParam: (lastGroup, allGroups) => {
        const morePagesExist = lastGroup?.length === 12;

        if (!morePagesExist) {
          return;
        } else {
          return allGroups.length + 1;
        }
      },
    }
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <Flex mb="4" justifyContent="space-between">
        <Input
          placeholder="Search products"
          value={search}
          onChange={handleSearchChange}
        />
        <Select placeholder="Filter by price" value={filter} onChange={handleFilterChange}>
          <option value='{"price": {"$lt": 50}}'>Below $50</option>
          <option value='{"price": {"$gte": 50, "$lt": 100}}'>$50 - $100</option>
          <option value='{"price": {"$gte": 100}}'>Above $100</option>
        </Select>
      </Flex>
      <div className="products">
        <Grid templateColumns="repeat(3,1fr)" gap={4}>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item) => (
                <Box w="100%" key={item._id}>
                  <Cards item={item} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </div>
      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
