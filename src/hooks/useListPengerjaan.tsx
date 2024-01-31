import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchListPengerjaan = async () => {
  const response = await axios.get(
    "https://wiremock.solusione.id/wiremock/test/services/MBFIN202111080000016"
  );

  return response.data;
};

export const useListPengerjaan = () => {
  return useQuery({
    queryKey: ["list-pengerjaan"],
    queryFn: () => fetchListPengerjaan(),
    staleTime: 10000,
  });
};
