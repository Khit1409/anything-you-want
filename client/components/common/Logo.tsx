import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={100}
          loading="lazy"
          height={100}
          className="w-[100px] h-[100px] p-0 m-0"
        />
      </Link>
    </div>
  );
}
