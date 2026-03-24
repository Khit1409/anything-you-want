"use client";

export default function Test() {
  const varitants = [
    {
      sku: "NIKE-WHITE-39",
      stock: 50,
      options: {
        color: "white",
        size: "39",
      },
      price_extra: 0,
    },
    {
      sku: "NIKE-WHITE-40",
      stock: 30,
      options: {
        color: "white",
        size: "40",
      },
      price_extra: 10000,
    },
    {
      sku: "NIKE-WHITE-41",
      stock: 20,
      options: {
        color: "white",
        size: "41",
      },
      price_extra: 5000,
    },

    {
      sku: "NIKE-RED-41",
      stock: 20,
      options: {
        color: "red",
        size: "39",
      },
      price_extra: 5000,
    },

    {
      sku: "NIKE-RED-41",
      stock: 20,
      options: {
        color: "red",
        size: "40",
      },
      price_extra: 5000,
    },
    {
      sku: "NIKE-RED-41",
      stock: 20,
      options: {
        color: "red",
        size: "41",
      },
      price_extra: 5000,
    },
  ];

  return <div></div>;
}
