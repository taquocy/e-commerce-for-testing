import React, { useEffect, useRef } from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button, Spinner, Skeleton } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;
      if (!morePagesExist) return undefined;
      return allGroups.length + 1;
    },
  });

  // Infinite Scroll Implementation
  const observer = useRef();
  const lastProductRef = (node) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  };

  if (status === "loading")
    return (
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} height="200px" />
        ))}
      </Grid>
    );

  if (status === "error")
    return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <div className="products">
        <Grid templateColumns="repeat(3,1fr)" gap={4}>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item, index) => {
                if (group.length === index + 1) {
                  return (
                    <Box w="100%" key={item._id} ref={lastProductRef}>
                      <Cards item={item} />
                    </Box>
                  );
                } else {
                  return (
                    <Box w="100%" key={item._id}>
                      <Cards item={item} />
                    </Box>
                  );
                }
              })}
            </React.Fragment>
          ))}
        </Grid>
      </div>

      {/* Loading Spinner */}
      {isFetchingNextPage && (
        <Flex mt="10" justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      )}

      {/* Fallback Button */}
      {!hasNextPage && (
        <Flex mt="10" justifyContent="center">
          <Button disabled>Nothing more to load</Button>
        </Flex>
      )}
    </div>
  );
}

export default Products;
