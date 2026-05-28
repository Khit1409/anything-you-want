"use client";

import useProfile from "@/hooks/users/userProfile";
import {
  faBirthdayCake,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Profile() {
  const { profile } = useProfile();

  return profile ? (
    (() => {
      const { addresses, info, phones } = profile;
      return (
        <div className={` w-full`}>
          {/* Header */}
          <div className="relative h-[400px] w-full overflow-hidden flex flex-col justify-center">
            {/* Gradient background chỉ cao 200px */}
            <div className="absolute top-0 left-0 w-full h-[200px] bg-linear-to-r from-pink-400 to-pink-700" />

            {/* Avatar */}
            <div className="absolute top-[120px] left-[50px]">
              {info.avatar ? (
                <div className="h-[200px] w-[200px] border border-(--border) rounded-full">
                  <Image
                    src={info.avatar}
                    alt="user avatar"
                    className="object-cover rounded-full"
                    objectFit="cover"
                    fill
                  />
                </div>
              ) : (
                <div className="h-[200px] w-[200px] bg-(--surface) border border-(--border) rounded-full" />
              )}
            </div>

            {/* User Info */}
            <div className="absolute top-[220px] left-[280px] flex flex-col justify-start">
              <div className="mb-3">
                <h3 className="text-xl font-semibold"></h3>
                <p className="text-(--muted)">
                  Some description about user or seller.
                </p>
              </div>
              <div className="flex text-(--muted) items-center gap-3">
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <small className="italic">
                    {addresses[0].addressDetail +
                      " - " +
                      addresses[0].ward +
                      " - " +
                      addresses[0].province}
                  </small>
                </div>
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faBirthdayCake} />
                  <small className="italic">{info.dateOfBirth}</small>
                </div>
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faPhone} />
                  <small className="italic">{phones[0].phoneNumber}</small>
                </div>
              </div>
            </div>

            {/* toggle */}
            <div className="absolute right-[200px] top-[220px]">
              <button className="border-(--border) border w-[30px] p-2 flex justify-center items-center h-[30px] rounded-full">
                ...
              </button>
            </div>
          </div>
        </div>
      );
    })()
  ) : (
    <div className={`w-full`}>
      {/* Header */}
      <div className="relative h-[400px] w-full overflow-hidden flex flex-col justify-center">
        {/* Gradient background chỉ cao 200px */}
        <div className="absolute top-0 left-0 w-full h-[200px] bg-linear-to-r from-pink-400 to-pink-700" />

        {/* Avatar */}
        <div className="absolute top-[120px] left-[50px]">
          <div className="h-[200px] w-[200px] bg-(--surface) border border-(--border) rounded-full" />
        </div>

        {/* User Info */}
        <div className="absolute top-[220px] left-[280px] flex flex-col justify-start">
          <div className="mb-3">
            <h3 className="text-xl font-semibold">Kevin Smith</h3>
            <p className="text-(--muted)">
              Some description about user or seller.
            </p>
          </div>
          <div className="flex text-(--muted) items-center gap-3">
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faLocationDot} />
              <small className="italic">Address of user or seller</small>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faBirthdayCake} />
              <small className="italic">01-01-2026</small>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faPhone} />
              <small className="italic">0987654321</small>
            </div>
          </div>
        </div>

        {/* toggle */}
        <div className="absolute right-[200px] top-[220px]">
          <button className="border-(--border) border w-[30px] p-2 flex justify-center items-center h-[30px] rounded-full">
            ...
          </button>
        </div>
      </div>
    </div>
  );
}
