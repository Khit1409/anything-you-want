export const SELLER_NAV = [
  {
    id: "1",
    category: "Home",
    icon: "house",
    childs: [
      {
        name: "Dashboard",
        url: "dashboard",
        icon: "chartLine",
      },
    ],
  },

  {
    id: "2",
    category: "Product Manager",
    url: "products",
    icon: "boxOpen",
    childs: [
      {
        name: "Your Product",
        icon: "receipt",
        url: "",
      },
      {
        name: "Create Product",
        url: "create",
        icon: "squarePlus",
      },
      {
        name: "Your Popular Products",
        url: "porpular",
        icon: "fire",
      },
    ],
  },

  {
    id: "3",
    category: "Customer Manager",
    url: "customers",
    icon: "users",
    childs: [
      {
        name: "Friendly Customers",
        url: "friendly",
        icon: "userGroup",
      },
    ],
  },

  {
    id: "4",
    category: "Messages",
    url: "messages",
    icon: "message",
    childs: [
      {
        name: "Customer feedback",
        url: "feedback",
        icon: "comments",
      },
      {
        name: "Store messages",
        url: "store",
        icon: "envelope",
      },
    ],
  },

  {
    id: "5",
    category: "Your Orders",
    url: "orders",
    icon: "cartShopping",
    childs: [
      {
        name: "New orders",
        url: "new",
        icon: "bagShopping",
      },
      {
        name: "Order List",
        url: "",
        icon: "receipt",
      },
    ],
  },

  {
    id: "6",
    category: "Settings",
    url: "",
    icon: "gear",
    childs: [
      {
        name: "Security",
        url: "/seller/setting/security",
        icon: "shieldHalved",
      },
    ],
  },
];
