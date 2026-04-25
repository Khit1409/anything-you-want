import { getInfoService } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await getInfoService();
    },
  });

  const profile = data;

  return {
    profile,
  };
}
