
import Image from "next/image";
import Link from "next/link";
import { Role } from "../interfaces/common.interface";
export default function Logo({ role }: { role?: Role }) {
  return (
    <div className="">
      <Link href={role && role === "seller" ? "/seller/dashboard" : "/"}>
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={100}
          loading="lazy"
          height={100}
          className="w-15 h-15 p-2 m-0 rounded-full"
        />
      </Link>
    </div>
  );
}
