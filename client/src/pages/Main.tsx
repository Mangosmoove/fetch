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
import {Paginator} from "primereact/paginator";
import {LogoutButton} from "../components/LogoutButton/LogoutButton.tsx";

export const Main = () => {
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<string>("");
    const [ageMax, setAgeMax] = useState<string>("");
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [dogData, setDogData] = useState<Dog[]>([]);
    const sort = useSelector((state: RootState) => state.filter.sort)
    const sortDirection = useSelector((state: RootState) => state.filter.sortDirection)

    // for determinng when to run filter search - isn't working tho
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);

    // for modal
    const [matchBtnPressed, setMatchBtnPressed] = useState<boolean>(false)
    const [matchDetails, setMatchDetails] = useState<Dog[]>([]);

    // for pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [totalDogs, setTotalDogs] = useState<number>(0);

    // TODO: figure out why sort is an empty string when filters cleared
    const {data: defaultSearchData} = useSearchDogsQuery({
        sort: `${sort}:${sortDirection}`,
        size: pageSize,
        from: page * pageSize
    }) as { data?: DogSearchResponse };
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();
    const [triggerSearch, {data: filteredData}] = useLazySearchDogsQuery();
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log('here')
        setSubmitClicked(true);
        dispatch(setFilters({selectedBreeds: selectedBreeds, ageMin: ageMin, ageMax: ageMax, zipCode: zipCodes}));
        triggerSearch({
            breeds: selectedBreeds,
            ageMin: ageMin,
            ageMax: ageMax,
            zipCodes: zipCodes,
            sort: `${sort}:${sortDirection}`,
            size: pageSize,
            from: page * pageSize
        });
    };

    // sets the data shown to users by default
    useEffect(() => {
        if (!defaultSearchData?.resultIds?.length) {
            return;
        }

        (async () => {
            try {
                setTotalDogs(defaultSearchData.total)
                const response = await fetchDogDetails(defaultSearchData.resultIds).unwrap();

                setDogData(response);
            } catch (error) {
                console.log(`something went wrong: ${error}`);
            }
        })();
    }, [defaultSearchData, fetchDogDetails]);

    // sets filtered data
    useEffect(() => {
        if (!filteredData || !submitClicked) {
            return;
        }
        (async () => {
            try {
                setTotalDogs(filteredData.total)
                const response = await fetchDogDetails(filteredData.resultIds).unwrap();
                setDogData(response);
            } catch (error) {
                console.log(`something went wrong: ${error}`);
            }
        })();
    }, [fetchDogDetails, filteredData]);

    return (
        <>
            <Row className='pt-3'>
                <Col xs={12} className='d-flex justify-content-end'>
                    <MatchButton setMatchDetails={setMatchDetails} setMatchBtnPressed={setMatchBtnPressed}/>
                    <LogoutButton />
                </Col>
            </Row>
            <Row className="py-3">
                <Col xs={3}>
                    <FiltersCard handleClick={handleClick}
                                 selectedBreeds={selectedBreeds}
                                 setSelectedBreeds={setSelectedBreeds}
                                 setAgeMin={setAgeMin}
                                 setAgeMax={setAgeMax}
                                 setZipCodes={setZipCodes}
                    />
                </Col>
                <Col xs={9}>
                    <DogCards data={dogData}/>
                </Col>
                <Col xs={12} className='w-100'>
                    <Paginator
                        first={page * pageSize}
                        rows={pageSize}
                        totalRecords={totalDogs || 0}
                        onPageChange={(e) => setPage(e.page)}
                    />
                </Col>
            </Row>
            <MatchedDogModal
                setMatchBtnPressed={setMatchBtnPressed}
                matchBtnPressed={matchBtnPressed}
                matchedDog={matchDetails}
            />
        </>
    );
};
