import { useGetDogBreedsQuery } from "../../api/api";
import { MultiSelect } from "primereact/multiselect";
import * as React from "react";

interface BreedFilterProps {
  selectedBreeds: string[];
  setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BreedFilter = ({selectedBreeds, setSelectedBreeds}: BreedFilterProps) => {
  const { data: breeds, isLoading } = useGetDogBreedsQuery();
  console.log(selectedBreeds)
  return (
    <MultiSelect
      filter
      options={breeds?.map((breed) => ({ label: breed, value: breed })) || []}
      value={selectedBreeds}
      onChange={(e) =>{ setSelectedBreeds(e.value)}}
      loading={isLoading}
      placeholder="Select Dog Breeds"
      display="chip"
      className="w-100"
    />
  );
};
