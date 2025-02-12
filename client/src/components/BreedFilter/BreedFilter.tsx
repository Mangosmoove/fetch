import { useState } from "react";
import { useGetDogBreedsQuery } from "../../api/api";
import { MultiSelect } from "primereact/multiselect";

export const BreedFilter = () => {
  const { data: breeds, isLoading } = useGetDogBreedsQuery();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  return (
    <MultiSelect
      filter
      options={breeds?.map((breed) => ({ label: breed, value: breed })) || []}
      value={selectedBreeds}
      onChange={(e) => setSelectedBreeds(e.value)}
      loading={isLoading}
      placeholder="Select Dog Breeds"
      display="chip"
      className="w-100"
    />
  );
};
