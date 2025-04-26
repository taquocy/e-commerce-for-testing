from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Khởi tạo trình duyệt
driver = webdriver.Chrome()
driver.get("https://e-commerce-for-testing.onrender.com/")

# Chờ trang tải xong
driver.implicitly_wait(5)

# Tìm phần tử và thao tác

# 1. Tìm ô tìm kiếm và nhập từ khóa "shirt"
search_box = driver.find_element(By.XPATH, "//input[@placeholder='Search']")
search_box.send_keys("shirt")
search_box.send_keys(Keys.ENTER)

time.sleep(2)  # Chờ kết quả tìm kiếm

# 2. Click vào nút "Add to cart" sản phẩm đầu tiên
add_to_cart_button = driver.find_element(By.XPATH, "(//button[contains(text(),'Add to cart')])[1]")
add_to_cart_button.click()

time.sleep(2)  # Chờ thêm giỏ hàng

# 3. Click biểu tượng giỏ hàng (Cart Icon ở góc phải)
cart_icon = driver.find_element(By.XPATH, "//a[@href='/cart']")
cart_icon.click()

time.sleep(2)  # Chờ mở giỏ hàng

# 4. Nhấn nút Checkout
checkout_button = driver.find_element(By.XPATH, "//button[contains(text(),'Checkout')]")
checkout_button.click()

# 5. Đợi để xem kết quả
time.sleep(10)

# Đóng trình duyệt
driver.quit()
