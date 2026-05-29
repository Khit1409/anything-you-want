import { getInfoService } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function useProfileQueries() {
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
