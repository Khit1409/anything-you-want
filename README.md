# Anything You Want (AYW)

## Mô tả

Anything You Want (AYW) là một ứng dụng thương mại điện tử mẫu gồm frontend (Next.js) và backend (NestJS). Dự án dùng MongoDB (Mongoose) cho một số dữ liệu và PostgreSQL / TypeORM cho phần quan hệ khi cần. Đây là repo ví dụ để phát triển, thử nghiệm tính năng thương mại và tích hợp seller/customer flows.

## Công nghệ chính

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript, TypeORM, Mongoose
- Database: PostgreSQL (pg) và MongoDB (mongoose)
- State & data: Redux Toolkit, React Query, Axios

## Yêu cầu môi trường

- Node.js 18+ (hoặc phiên bản tương thích với các package)
- npm hoặc pnpm
- PostgreSQL và (tùy chọn) MongoDB nếu cần cho môi trường dev

## Cấu trúc thư mục chính (tổng quan)

- `client/` — frontend Next.js (app/, components/, public/...)

  - `app/` — layout, pages, route groups (Next 13+ app router)
  - `components/` — UI components được tái sử dụng
  - `hooks/`, `interfaces/`, `lib/` — helper, typing, API clients

- `server/` — backend NestJS

  - `src/` — mã nguồn NestJS (modules, controllers, services)
  - `src/database/` — datasource + migration scripts
  - `test/` — e2e & unit test config

- `public/` — tài nguyên tĩnh dùng bởi frontend
- `data/` — dữ liệu mẫu / fake data
- `redux/` — cấu hình redux, slices và provider
- `pages/` — (các trang cũ hoặc helper) ví dụ

Tệp cấu hình cơ bản:

- `package.json` (root) — script chạy song song client + server
- `client/package.json` — script và dependencies frontend
- `server/package.json` — script và dependencies backend

## Cài đặt và chạy (môi trường phát triển)

1. Clone repo:

```bash
git clone https://github.com/Khit1409/anything-you-want-e-commerce.git
cd anything-you-want-ecommerce/AYW
```

2. Cài đặt dependencies:

```bash
npm install            # ở thư mục gốc (cài concurrently nếu cần)
cd client && npm install
cd ../server && npm install
```

3. Cấu hình biến môi trường:

- Tạo file `.env` trong `server/` và khai báo biến cần thiết (ví dụ `PORT`, DB connection strings, JWT secret, v.v.).
- `server/src/main.ts` mặc định chạy trên cổng `8080` nếu không có `PORT`.

4. Chạy ở chế độ phát triển (song song):

```bash
# từ thư mục gốc dự án
npm run dev
```

- Lệnh ở root sử dụng `concurrently` để khởi chạy frontend và backend cùng lúc.
- Frontend mặc định chạy trên `http://localhost:3000`
- Backend mặc định chạy trên `http://localhost:8080` (global prefix `/api` được thiết lập)

## Scripts chính

- Root (từ `package.json` gốc):
  - `npm run dev` — chạy client + server song song (dùng `concurrently`)
- Frontend (`client/package.json`):
  - `npm run dev` — Next.js dev server
  - `npm run build` — build production
  - `npm run start` — start production server
- Backend (`server/package.json`):
  - `npm run start:dev` — NestJS watch mode (phát triển)
  - `npm run start` — start production (dùng `nest start`)
  - `npm run build` — build NestJS
  - Migration: `migration:generate`, `migration:run`, `migration:revert`

## Kiến trúc & luồng chính

- Backend: Sử dụng NestJS module-based architecture, cấu hình CORS cho `http://localhost:3000` và `http://localhost:8080`, prefix API là `/api`.
- Frontend: Next.js (App Router) với các route nhóm cho user, seller, auth, v.v. Sử dụng React Query và Redux Toolkit để quản lý trạng thái và cache.

## Kiểm thử

- Backend: `npm run test` hoặc `npm run test:e2e` trong thư mục `server/` (Jest + ts-jest config đã có sẵn).

## Góp phần

- Mở PR cho các tính năng, fix bug hoặc cải thiện tài liệu.
- Vui lòng tạo issue mô tả thay đổi mong muốn trước khi làm các thay đổi lớn.

## Tác giả / Liên hệ

- Repository gốc: https://github.com/Khit1409/anything-you-want-e-commerce
- Email liên hệ (tác giả gốc, theo file README cũ): `khitquangdai1409@gmail.com` hoặc `devquang1409@gmail.com`

## Giấy phép

- Kiểm tra repository gốc để biết chi tiết bản quyền / license. File hiện tại trong `server` là `UNLICENSED`.

---

Ghi chú: README này đã sửa lỗi chính tả và mở rộng hướng dẫn cài đặt, cấu trúc thư mục và scripts. Nếu bạn muốn tôi liệt kê chi tiết cây thư mục (toàn bộ mọi file/thư mục con), báo cho tôi biết để tôi tạo danh sách đầy đủ.
