import {useEffect, useState} from "react";
import {useLazySearchDogsQuery, useSearchDogsQuery, useLazyGetDogDetailsQuery} from "../api/api";
import {DogCards} from "../components/DogCards/DogCards.tsx";
import {Dog, DogSearchResponse} from "../utils/type.ts";

export const Main = () => {
    const {data: defaultSearchData} = useSearchDogsQuery({}) as { data?: DogSearchResponse };
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();

    // const [triggerSearch, {data, isLoading, isError, isSuccess}] =
    //     useLazySearchDogsQuery();
    const [dogData, setDogData] = useState<Dog[]>([]);

    // const handleClick = () => {
    //     triggerSearch({breeds: ["Labrador", "Airedale"]});
    // };

    useEffect(() => {
        if (!defaultSearchData?.resultIds?.length) {
            return;
        }

        (async () => {
            try {
                // experimental:
                // const chunkSize = 100; // because api call does up to 100 ids at a time
                // let arrDogsObj: Dog[] = [];
                //
                // for (let i = 0; i < defaultSearchData.total; i += chunkSize) {
                //     const chunk = defaultSearchData.resultIds.slice(i, i + chunkSize);
                //     const response = await fetchDogDetails(chunk).unwrap()
                //     if (response?.dogs) {
                //         //concatenate the dog objects returned to the list of dog objects
                //         arrDogsObj = [...arrDogsObj, ...response.dogs];
                //     }
                // }
                const response = await fetchDogDetails(defaultSearchData.resultIds).unwrap();
                setDogData(response);
            } catch (error) {
                console.log(`something went wrong: ${error}`);
            }
        })();
    }, [defaultSearchData, fetchDogDetails]);

    return (
        <>
            <DogCards data={dogData}/>
        </>

    );
};
