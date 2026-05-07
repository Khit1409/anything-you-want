export const SELLER_NAV = [
  {
    id: "1",
    category: "Home",
    icon: "house",
    childs: [
      {
        name: "Dashboard",
        url: "/seller/dashboard",
        icon: "chartLine",
      },
    ],
  },

  {
    id: "2",
    category: "Product Manager",
    icon: "boxOpen",
    childs: [
      {
        name: "Create Product",
        url: "/seller/create-product",
        icon: "squarePlus",
      },
      {
        name: "Your Popular Products",
        url: "/seller/popular-products",
        icon: "fire",
      },
    ],
  },

  {
    id: "3",
    category: "Customer Manager",
    icon: "users",
    childs: [
      {
        name: "Friendly Customers",
        url: "/seller/friendly-customers",
        icon: "userGroup",
      },
    ],
  },

  {
    id: "4",
    category: "Messages",
    icon: "message",
    childs: [
      {
        name: "Customer feedback",
        url: "/seller/customer-feedback",
        icon: "comments",
      },
      {
        name: "Store messages",
        url: "/seller/store-messages",
        icon: "envelope",
      },
    ],
  },

  {
    id: "5",
    category: "Your Orders",
    icon: "cartShopping",
    childs: [
      {
        name: "New orders",
        url: "/sellers/new-orders",
        icon: "bagShopping",
      },
      {
        name: "Order List",
        url: "/sellers/orders",
        icon: "receipt",
      },
    ],
  },

  {
    id: "6",
    category: "Settings",
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
