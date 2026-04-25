# TODO LIST – E-COMMERCE SYSTEM

## 1. Seller Registration

- Thiết kế UI trang đăng ký bán hàng (seller register)
- API đăng ký seller
- Validate dữ liệu (email, password, thông tin store)
- Tạo seller + store + store_info
- Xử lý duplicate (email, storeCode, slug)

## 2. Product Management (Seller)

### Backend

- API CRUD sản phẩm (create, read, update, delete)
- Validate dữ liệu sản phẩm
- Xử lý classification (variants, stock, price)
- Upload & lưu images (thumbnail + details)

### Frontend

- UI danh sách sản phẩm (table/list)
- UI tạo sản phẩm
- UI edit sản phẩm
- UI preview sản phẩm

## 3. Change Password

- API đổi mật khẩu
- Verify password cũ
- Hash password mới
- UI form đổi mật khẩu
- Validate (confirm password)

## 4. User Profile

### Frontend

- UI trang profile
- Form chỉnh sửa thông tin (name, avatar, phone,...)

### Backend

- API update profile
- Upload avatar
- Validate dữ liệu

## 5. Delete Account

- API xóa tài khoản user
- API xóa tài khoản seller
- Xác nhận trước khi xóa (confirm password / warning UI)
- Xử lý cascade (orders, products, store,...)

## 6. Orders Management

### Backend

- API CRUD orders
- Logic tạo order (cart → order)
- Update status (pending, shipping, completed, canceled)

### Frontend

- UI danh sách orders
- UI chi tiết order
- UI trạng thái đơn hàng

## 7. Email & Message System

- Thiết kế hệ thống gửi email (service)
- Template email (register, login, order, etc.)
- Trigger email khi:
  - Register
  - Login
  - Logout
  - Create order

- Lưu message/log vào DB (optional)
- UI hiển thị notification (nếu có)

## Priority Suggestion

1. Seller Register
2. Product CRUD (22/4/2026)
3. Orders
4. Profile + Change Password
5. Email System
6. Delete Account
