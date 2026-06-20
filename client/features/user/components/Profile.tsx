"use client";

import useProfileQueries from "@/hooks/users/queries/useProfileQueries";
import {
  faBirthdayCake,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Profile() {
  const { profile } = useProfileQueries();

  return profile ? (
    (() => {
      const { addresses, info, phones } = profile;
      return (
        <div className={` w-full`}>
          {/* Header */}
          <div className="relative h-100 w-full overflow-hidden flex flex-col justify-center">
            {/* Gradient background chỉ cao 200px */}
            <div className="absolute top-0 left-0 w-full h-50 bg-linear-to-r from-pink-400 to-pink-700" />

            {/* Avatar */}
            <div className="absolute top-30 left-12.5">
              {info.avatar ? (
                <div className="h-50 w-50 border border-(--border) rounded-full">
                  <Image
                    src={info.avatar}
                    alt="user avatar"
                    className="object-cover rounded-full"
                    objectFit="cover"
                    fill
                  />
                </div>
              ) : (
                <div className="h-50 w-50 bg-(--surface) border border-(--border) rounded-full" />
              )}
            </div>

            {/* User Info */}
            <div className="absolute top-55 left-70 flex flex-col justify-start">
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
            <div className="absolute right-50 top-55">
              <button className="border-(--border) border w-7.5 p-2 flex justify-center items-center h-7.5 rounded-full">
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
      <div className="relative h-100 w-full overflow-hidden flex flex-col justify-center">
        {/* Gradient background chỉ cao 200px */}
        <div className="absolute top-0 left-0 w-full h-50 bg-linear-to-r from-pink-400 to-pink-700" />

        {/* Avatar */}
        <div className="absolute top-30 left-12.5">
          <div className="h-50 w-50 bg-(--surface) border border-(--border) rounded-full" />
        </div>

        {/* User Info */}
        <div className="absolute top-55 left-70 flex flex-col justify-start">
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
        <div className="absolute right-50 top-55">
          <button className="border-(--border) border w-7.5 p-2 flex justify-center items-center h-7.5 rounded-full">
            ...
          </button>
        </div>
      </div>
    </div>
  );
}
