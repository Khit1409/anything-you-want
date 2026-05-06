import AccessDenied from "@/components/common/AccessDenied";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Từ Chối Quyền Truy Cập",
  description: "Website ecommerce is the best in the word",
  icons: {
    icon: "/assets/images/logo.png",
  },
};
export default function page() {
  return (
    <div>
      <AccessDenied />
    </div>
  );
}
