const classifications = [
  {
    name: "Màu",
    values: [
      {
        name: "Xám",
        img: "https://res.cloudinary.com/dk9rtdomy/image/upload/v1780226322/images/uzjyqsvffifzkit1w8mj.webp",
      },
      {
        name: "Xanh Xám",
        img: "https://res.cloudinary.com/dk9rtdomy/image/upload/v1780226338/images/qmewykigdjjtmgihpcms.webp",
      },
      {
        name: "Trắng",
        img: "https://res.cloudinary.com/dk9rtdomy/image/upload/v1780226348/images/gvw0tkbo4qpgujicno1x.webp",
      },
      {
        name: "Đen",
        img: "https://res.cloudinary.com/dk9rtdomy/image/upload/v1780226358/images/ufswwwpw8zippibbo6v1.webp",
      },
    ],
  },
  {
    name: "Size",
    values: [
      {
        name: "M",
        img: "",
      },
      {
        name: "XL",
        img: "",
      },
      {
        name: "XXL",
        img: "",
      },
      {
        name: "Free Size",
        img: "",
      },
      {
        name: "3XL",
        img: "",
      },
    ],
  },
];
const variants = [
  {
    id: "6a2ea5ada6f884321d740d93",
    sku: "AO-212-XAM-M",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xám",
      size: "M",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d94",
    sku: "AO-212-XANH-XAM-M",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xanh Xám",
      size: "M",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d95",
    sku: "AO-212-TRANG-M",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Trắng",
      size: "M",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d96",
    sku: "AO-212-DEN-M",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Đen",
      size: "M",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d97",
    sku: "AO-212-VANG-M",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Vàng",
      size: "M",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d98",
    sku: "AO-212-XAM-XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xám",
      size: "XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d99",
    sku: "AO-212-XANH-XAM-XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xanh Xám",
      size: "XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d9a",
    sku: "AO-212-TRANG-XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Trắng",
      size: "XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d9b",
    sku: "AO-212-DEN-XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Đen",
      size: "XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d9c",
    sku: "AO-212-VANG-XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Vàng",
      size: "XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d9d",
    sku: "AO-212-XAM-XXL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xám",
      size: "XXL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d9e",
    sku: "AO-212-XANH-XAM-XXL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xanh Xám",
      size: "XXL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740d9f",
    sku: "AO-212-TRANG-XXL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Trắng",
      size: "XXL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da0",
    sku: "AO-212-DEN-XXL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Đen",
      size: "XXL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da1",
    sku: "AO-212-VANG-XXL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Vàng",
      size: "XXL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da2",
    sku: "AO-212-XAM-FREE-SIZE",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xám",
      size: "Free Size",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da3",
    sku: "AO-212-XANH-XAM-FREE-SIZE",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xanh Xám",
      size: "Free Size",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da4",
    sku: "AO-212-TRANG-FREE-SIZE",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Trắng",
      size: "Free Size",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da5",
    sku: "AO-212-DEN-FREE-SIZE",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Đen",
      size: "Free Size",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da6",
    sku: "AO-212-VANG-FREE-SIZE",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Vàng",
      size: "Free Size",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da7",
    sku: "AO-212-XAM-3XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xám",
      size: "3XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da8",
    sku: "AO-212-XANH-XAM-3XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Xanh Xám",
      size: "3XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740da9",
    sku: "AO-212-TRANG-3XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Trắng",
      size: "3XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740daa",
    sku: "AO-212-DEN-3XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Đen",
      size: "3XL",
    },
  },
  {
    id: "6a2ea5ada6f884321d740dab",
    sku: "AO-212-VANG-3XL",
    stock: 0,
    extraPrice: 0,
    options: {
      mau: "Vàng",
      size: "3XL",
    },
  },
];
