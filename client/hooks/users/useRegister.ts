import { RegisterUserAccountRequest } from "@/interfaces/request/auth.request";
import { useState } from "react";

export default function useRegister() {
  const [formData, setFormData] = useState<RegisterUserAccountRequest>({
    address: [],
    currentPassword: "",
    dateOfBirth: "",
    emailAddress: "",
    firstName: "",
    fullName: "",
    lastName: "",
    phones: [],
  });

  const [inputAddress, setInputAddress] = useState<number>(1);
  const [inputPhone, setInputPhone] = useState<number>(1);

  const onchange = () => {};

  return {
    inputAddress,
    setInputAddress,
    inputPhone,
    setInputPhone,
    formData,
    setFormData,
  };
}
