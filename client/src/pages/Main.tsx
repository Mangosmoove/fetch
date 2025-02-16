import {useEffect, useState} from "react";
import {useLazySearchDogsQuery, useSearchDogsQuery, useLazyGetDogDetailsQuery} from "../api/api";
import {DogCards} from "../components/DogCards/DogCards.tsx";
import {Dog, DogSearchResponse} from "../utils/type.ts";
import {FiltersCard} from "../components/FiltersCard/FiltersCard.tsx";
import {Col, Row} from "react-bootstrap";

export const Main = () => {
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<string>("");
    const [ageMax, setAgeMax] = useState<string>("");
    const [zipCode, setZipCode] = useState<string[]>([]);
    const [sort, setSort] = useState<string>("breed:asc");

    const {data: defaultSearchData} = useSearchDogsQuery({sort: sort}) as { data?: DogSearchResponse };
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();
    const [triggerSearch, {data: filteredData}] = useLazySearchDogsQuery();
    const [dogData, setDogData] = useState<Dog[]>([]);

    const handleClick = () => {
        triggerSearch({breeds: selectedBreeds, ageMin: ageMin, ageMax: ageMax, zipCodes: zipCode});
    };

    useEffect(() => {
        if (!defaultSearchData?.resultIds?.length) {
            return;
        }

        (async () => {
            try {
                const response = await fetchDogDetails(defaultSearchData.resultIds).unwrap();
                setDogData(response);
            } catch (error) {
                console.log(`something went wrong: ${error}`);
            }
        })();
    }, [defaultSearchData, fetchDogDetails]);

    useEffect(() => {
        if (!filteredData) {
            return;
        }
        (async () => {
            try {
                const response = await fetchDogDetails(filteredData.resultIds).unwrap();
                setDogData(response);
            } catch (error) {
                console.log(`something went wrong: ${error}`);
            }
        })();
    }, [fetchDogDetails, filteredData]);

    return (
        <>
            <Row className="py-3">
                <Col xs={3}>
                    <FiltersCard handleClick={handleClick} selectedBreeds={selectedBreeds}
                                 setSelectedBreeds={setSelectedBreeds}
                                 setAgeMin={setAgeMin}
                                 setAgeMax={setAgeMax}
                                 setZipCode={setZipCode}
                                 setSort={setSort}
                    />
                </Col>
                <Col>
                    <DogCards data={dogData}/>
                </Col>
            </Row>
        </>
    );
};
