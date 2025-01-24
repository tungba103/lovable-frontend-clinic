import { useQuery } from "@tanstack/react-query";
import { getVisit } from "@/services/api/visit";

export const useVisit = (visitId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['visit', visitId],
    queryFn: () => getVisit(visitId!),
    select: (data) => data.data.result,
    enabled: !!visitId,
  });

  return {
    visit: data,
    isLoading,
  };
}; 