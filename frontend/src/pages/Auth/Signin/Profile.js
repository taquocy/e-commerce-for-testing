import React, { useEffect, useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem có token không
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/login"); // Nếu không có token, điều hướng về login
    } else {
      // Nếu có token, lấy thông tin người dùng
      fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserInfo(data);
        })
        .catch(error => {
          console.error("Có lỗi khi lấy thông tin người dùng:", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Xóa token khỏi localStorage
    navigate("/login"); // Điều hướng về trang login
  };

  return (
    <Box>
      {userInfo ? (
        <Box>
          <Text fontSize="2xl" mb={4}>Xin chào, {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Button mt={4} colorScheme="red" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Box>
      ) : (
        <Text>Đang tải thông tin người dùng...</Text>
      )}
    </Box>
  );
};

export default Profile;
