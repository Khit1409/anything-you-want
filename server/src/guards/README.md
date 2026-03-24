# Guards

- `AuthGuard`: Bảo vệ các route yêu cầu xác thực bằng cách kiểm tra `req.userId` trên đối tượng `Request`. Nếu `userId` không tồn tại sẽ ném `UnauthorizedException` (yêu cầu đăng nhập); nếu tồn tại thì cho phép tiếp tục.

- `RolesGuard`: Kiểm tra quyền (role) của người dùng so với metadata `@Roles(...)` (sử dụng `ROLES_KEY` qua `Reflector`). Nếu endpoint không khai báo role yêu cầu thì cho phép; nếu có thì lấy `request.role` và trả `true` khi role của người dùng nằm trong danh sách yêu cầu, ngược lại trả `false` (chặn truy cập).
