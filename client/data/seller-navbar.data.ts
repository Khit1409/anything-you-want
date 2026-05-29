export const SELLER_NAV = [
  {
    id: "1",
    category: "Trang Chủ",
    icon: "house",
    childs: [
      {
        name: "Quản lý cửa hàng",
        url: "dashboard",
        icon: "chartLine",
      },
    ],
  },

  {
    id: "2",
    category: "Sản Phẩm",
    url: "products",
    icon: "boxOpen",
    childs: [
      {
        name: "Danh sách sản phẩm",
        icon: "receipt",
        url: "",
      },
      {
        name: "Tạo sản phẩm",
        url: "create",
        icon: "squarePlus",
      },
      {
        name: "Sản phẩm bán chạy",
        url: "porpular",
        icon: "fire",
      },
    ],
  },

  {
    id: "3",
    category: "Khách Hàng",
    url: "customers",
    icon: "users",
    childs: [
      {
        name: "Khách hàng thân thiết",
        url: "friendly",
        icon: "userGroup",
      },
    ],
  },

  {
    id: "4",
    category: "Tin Nhắn",
    url: "messages",
    icon: "message",
    childs: [
      {
        name: "Phản hồi từ khách hàng",
        url: "feedback",
        icon: "comments",
      },
      {
        name: "Tin nhắn của cửa hàng",
        url: "store",
        icon: "envelope",
      },
    ],
  },

  {
    id: "5",
    category: "Đơn Hàng",
    url: "orders",
    icon: "cartShopping",
    childs: [
      {
        name: "Đơn hàng mới",
        url: "new",
        icon: "bagShopping",
      },
      {
        name: "Danh sách đơn hàng",
        url: "",
        icon: "receipt",
      },
    ],
  },

  {
    id: "6",
    category: "Cài Đặt",
    url: "",
    icon: "gear",
    childs: [
      {
        name: "Bảo mật",
        url: "/seller/setting/security",
        icon: "shieldHalved",
      },
    ],
  },
];
