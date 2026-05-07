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
          className="w-[60px] h-[60px] p-0 m-0 rounded-full"
        />
      </Link>
    </div>
  );
}
