import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductList } from "../../api";
import { Grid, Box } from "@chakra-ui/react";
import Cards from "../../components/Card";

// Hook để lấy tham số query từ URL
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const queryParams = useQueryParams();
  const searchTerm = queryParams.get("query"); // Lấy từ khóa tìm kiếm từ query string

  // Gọi API để lấy danh sách sản phẩm theo từ khóa tìm kiếm
  const { data, status } = useQuery(
    ["products", searchTerm],
    () => fetchProductList({ pageParam: 1, searchTerm }),  // Truyền từ khóa tìm kiếm vào API
    { enabled: !!searchTerm } // Chỉ gọi API khi có từ khóa tìm kiếm
  );

  // Xử lý trạng thái loading và lỗi
  if (status === "loading") return <div>Đang tải...</div>;
  if (status === "error") return <div>Đã có lỗi xảy ra.</div>;

  return (
    <div>
      <h1>Kết quả tìm kiếm cho: "{searchTerm}"</h1>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {data?.map((product) => (
          <Box key={product._id}>
            <Cards item={product} />
          </Box>
        ))}
      </Grid>
    </div>
  );
}

export default SearchResults;
