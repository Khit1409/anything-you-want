import React, { useState } from "react";
import {
  CreateProductShipping,
  CreateProductShippingTime,
  ShippingMethod,
} from "@/interfaces/product.interface";

export default function useProductShippingHelpers() {
  const [shipping, setShipping] = useState<CreateProductShipping>({
    methods: [
      {
        enabled: true,
        type: ShippingMethod.STANDARD,
        times: { deliveryDays: 0, prepareDays: 0 },
      },
      {
        enabled: false,
        type: ShippingMethod.EXPRESS,
        times: { deliveryDays: 0, prepareDays: 0 },
      },
      {
        enabled: false,
        type: ShippingMethod.INTERNATIONAL,
        times: { deliveryDays: 0, prepareDays: 0 },
      },
      {
        enabled: false,
        type: ShippingMethod.NEXTDAY,
        times: { deliveryDays: 0, prepareDays: 0 },
      },
      {
        enabled: false,
        type: ShippingMethod.SAMEDAY,
        times: { deliveryDays: 0, prepareDays: 0 },
        supportedProvinces: [],
      },
      {
        enabled: false,
        type: ShippingMethod.SCHEDULED,
        times: { deliveryDays: 0, prepareDays: 0 },
      },
      {
        enabled: false,
        type: ShippingMethod.PICKUP,
        times: { deliveryDays: 0, prepareDays: 0 },
        supportedProvinces: [],
      },
    ],
  });

  const onchangeShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    return setShipping((prev) => {
      return {
        ...prev,
        methods: prev.methods.map((method) =>
          method.type === (name as ShippingMethod)
            ? {
                ...method,
                enabled: name === "standard" ? true : checked,
              }
            : method
        ),
      };
    });
  };

  const onchangeShippingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;

    return setShipping((prev) => {
      const shippingType = dataset.shippingType;
      if (!shippingType) return prev;
      const newMethods = [...prev.methods];
      const shippingMethodIndex = newMethods.findIndex(
        (f) => f.type === shippingType
      );
      if (shippingMethodIndex == -1) return prev;
      newMethods[shippingMethodIndex].times[
        name as keyof CreateProductShippingTime
      ] = Number(value) > 3 ? 3 : Number(value);

      return { ...prev, methods: newMethods };
    });
  };

  const onchangeSupportProvinces = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset, checked } = e.target;

    const shippingType = dataset.shippingType;
    console.log(name, value, checked, shippingType);

    if (!shippingType) return;
    if (
      shippingType !== ShippingMethod.SAMEDAY &&
      shippingType !== ShippingMethod.PICKUP
    )
      return;

    return setShipping((prev) => {
      const index = prev.methods.findIndex((f) => f.type === shippingType);
      if (index == -1) return prev;
      let newSupports = [...(prev.methods[index].supportedProvinces ?? [])];
      const existing = newSupports.find((f) => f === value);

      if (existing) {
        newSupports = newSupports.filter((ft) => ft !== value);
        return {
          ...prev,
          methods: prev.methods.map((method, i) =>
            i === index
              ? {
                  ...method,
                  supportedProvinces: newSupports,
                }
              : method
          ),
        };
      }
      newSupports = [...newSupports, value];

      return {
        ...prev,
        methods: prev.methods.map((m, i) =>
          i === index
            ? {
                ...m,
                supportedProvinces: newSupports,
              }
            : m
        ),
      };
    });
  };

  const checkingShipping = (shipping: CreateProductShipping) => {
    const supportZero = shipping.methods.find(
      (f) =>
        (f.type === ShippingMethod.SAMEDAY &&
          f.supportedProvinces?.length == 0) ||
        (f.type === ShippingMethod.PICKUP && f.supportedProvinces?.length == 0)
    );

    if (supportZero)
      return {
        ok: false,
        message: `${supportZero.type} cần chọn tỉnh thành hộ trợ!`,
      };

    const isZeroDays = shipping.methods.find(
      (f) => f.times.deliveryDays == 0 || f.times.prepareDays == 0
    );
    if (isZeroDays) {
      return {
        ok: false,
        message: `${isZeroDays.type} vui lòng nhập ngày hợp lệ!`,
      };
    }

    return { ok: true, message: "" };
  };

  return {
    shipping,
    setShipping,
    onchangeShipping,
    onchangeShippingTime,
    onchangeSupportProvinces,
    checkingShipping,
  };
}
