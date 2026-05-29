import { RegisterSellerAccount } from "@/interfaces";
import React, { useState } from "react";

export default function useRegisterSellerHelpers() {
  const [registerData, setRegisterData] = useState<
    RegisterSellerAccount & { rePassword: string }
  >({
    rePassword: "",
    addresses: [],
    phones: [],
    currentPassword: "",
    emailAddress: "",
    info: {
      dateOfBirth: "",
      firstName: "",
      fullName: "",
      lastName: "",
      avatar: "",
    },
    store: {
      info: {
        description: "",
        emailAddress: "",
        name: "",
        phoneNumber: "",
        avatar: "",
        thumbnail: "",
      },
      storeCode: "",
    },
  });

  const [showHiddenInput, setShowHiddenInput] = useState<{
    id: string;
    type: string;
  }>({ id: "", type: "" });

  const onchangFormInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: value },
    }));
  };
  const onchangFormStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "storeCode") {
      setRegisterData((prev) => ({
        ...prev,
        store: { ...prev.store, storeCode: value },
      }));
    } else {
      setRegisterData((prev) => ({
        ...prev,
        store: { ...prev.store, info: { ...prev.store.info, [name]: value } },
      }));
    }
  };
  const onchangFormAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value })); // currentPassword và emailAddress nằm ngoài nên lấy đc
  };

  return {
    setShowHiddenInput,
    showHiddenInput,
    registerData,
    onchangFormAuth,
    onchangFormInfo,
    onchangFormStore,
  };
}
