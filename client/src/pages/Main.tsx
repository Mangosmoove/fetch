import {useEffect, useState} from "react";
import {useLazySearchDogsQuery, useSearchDogsQuery, useLazyGetDogDetailsQuery} from "../api/api";
import {DogCards} from "../components/DogCards/DogCards.tsx";
import {Dog, DogSearchResponse} from "../utils/type.ts";
import {FiltersCard} from "../components/FiltersCard/FiltersCard.tsx";
import {Col, Row} from "react-bootstrap";
import {setFilters} from "../redux/slices/filter.slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {MatchButton} from "../components/MatchButton/MatchButton.tsx";
import {MatchedDogModal} from "../components/MatchedDogModal/MatchedDogModal.tsx";

export const Main = () => {
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<string>("");
    const [ageMax, setAgeMax] = useState<string>("");
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [dogData, setDogData] = useState<Dog[]>([]);
    const sort = useSelector((state: RootState) => state.filter.sort)

    const [matchDetails, setMatchDetails] = useState<Dog[]>([]);

    // TODO: figure out why sort is an empty string when filters cleared
    const {data: defaultSearchData} = useSearchDogsQuery({sort: sort}) as { data?: DogSearchResponse };
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();
    const [triggerSearch, {data: filteredData}] = useLazySearchDogsQuery();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setFilters({selectedBreeds: selectedBreeds, ageMin: ageMin, ageMax: ageMax, zipCode: zipCodes}));
        triggerSearch({breeds: selectedBreeds, ageMin: ageMin, ageMax: ageMax, zipCodes: zipCodes, sort: sort});
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
            <Row>
                <Col xs={12} className='d-flex justify-content-end'>
                    <MatchButton setMatchDetails={setMatchDetails} />
                </Col>
            </Row>
            <Row className="py-3">
                <Col xs={3}>
                    <FiltersCard handleClick={handleClick} selectedBreeds={selectedBreeds}
                                 setSelectedBreeds={setSelectedBreeds}
                                 setAgeMin={setAgeMin}
                                 setAgeMax={setAgeMax}
                                 setZipCodes={setZipCodes}
                    />
                </Col>
                <Col>
                    <DogCards data={dogData}/>
                </Col>
            </Row>
            <MatchedDogModal matchedDog={matchDetails} />
        </>
    );
};
