import { useEffect } from "react";
import { useGetDogBreedsQuery } from "../../api/api";

export const BreedFilter = () => {
  const { data: breeds } = useGetDogBreedsQuery();

  return <></>;
};
