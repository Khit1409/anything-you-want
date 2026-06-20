import Link from "next/link";

import { RegisterSellerAccount } from "@/features/seller/interfaces/seller.interface";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { registerSellerService } from "@/features/seller/services/seller.service";
import BasicSellerSection from "./sections/BasicSellerSection";
import PhoneSellerSection from "./sections/PhoneSellerSection";
import AddressSellerSection from "./sections/AddressSellerSection";
import StoreSellerSection from "./sections/StoreSellerSection";
import SecuritySellerSection from "./sections/SecuritySellerSection";
import AgreeSellerSection from "./sections/AgreeSellerSection";

export default function RegisterSellerForm() {
  const { register, setValue, handleSubmit, watch, control } = useForm<{
    data: RegisterSellerAccount;
  }>({
    defaultValues: {
      data: {
        addresses: [
          {
            addressDetail: "",
            province: "",
            ward: "",
          },
        ],
        currentPassword: "",
        emailAddress: "",
        info: {
          avatar: "",
          dateOfBirth: "",
          firstName: "",
          fullName: "",
          lastName: "",
        },
        phones: [
          {
            phoneNumber: "",
          },
        ],
        store: {
          info: {
            avatar: "",
            description: "",
            emailAddress: "",
            name: "",
            phoneNumber: "",
            thumbnail: "",
          },
        },
      },
    },
  });

  console.log(useWatch({ control, name: "data" }));

  const phoneFieldArray = useFieldArray({
    control,
    name: "data.phones" as const,
  });
  const addressFieldArray = useFieldArray({
    control,
    name: "data.addresses" as const,
  });

  return (
    <div className="min-h-screen bg-zinc-50 flex items-start justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit((data) => registerSellerService(data))}
        className="w-full max-w-[90%] bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
      >
        {/* Seller Sections */}
        <div className="mb-10">
          <BasicSellerSection register={register} />
          <PhoneSellerSection
            phoneFields={phoneFieldArray}
            register={register}
          />
          <AddressSellerSection
            addressFields={addressFieldArray}
            setValue={setValue}
            watch={watch}
            register={register}
          />
        </div>

        {/* Store + Security Sections */}
        <div className="mb-10">
          <StoreSellerSection register={register} />
          <SecuritySellerSection register={register} />
          <div className="mt-6">
            <AgreeSellerSection />
          </div>
        </div>

        {/* button actions */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
          <div className="flex gap-2">
            <Link
              href="/"
              className="px-4 py-2.5 text-sm text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 hover:text-zinc-700 transition-colors duration-150"
            >
              ← Trang chủ
            </Link>
            <a
              href="/login"
              className="px-4 py-2.5 text-sm text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 hover:text-zinc-700 transition-colors duration-150"
            >
              Đã có tài khoản
            </a>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-150"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}
