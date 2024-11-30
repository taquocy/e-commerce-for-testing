import React, { useState } from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button, Input } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";

function Products() {
  const [searchTitle, setSearchTitle] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["products", searchTitle, filterPrice],
    ({ pageParam = 1 }) =>
      fetchProductList({ pageParam, title: searchTitle, price: filterPrice }),
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

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <div>
      <Flex mb={4} justifyContent="center">
        <Input
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          mr={2}
        />
        <Input
          placeholder="Filter by price"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
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
