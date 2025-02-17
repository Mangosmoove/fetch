import {useEffect, useRef, useState} from "react";
import {useLazySearchDogsQuery, useSearchDogsQuery, useLazyGetDogDetailsQuery} from "../api/api";
import {DogCards} from "../components/DogCards/DogCards.tsx";
import {Dog, DogSearchResponse} from "../utils/type.ts";
import {FiltersCard} from "../components/FiltersCard/FiltersCard.tsx";
import {Col, Row} from "react-bootstrap";
import {resetFilters, resetSortDirection, setFilters, setSort} from "../redux/slices/filter.slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {MatchButton} from "../components/MatchButton/MatchButton.tsx";
import {MatchedDogModal} from "../components/MatchedDogModal/MatchedDogModal.tsx";
import {Paginator} from "primereact/paginator";
import {LogoutButton} from "../components/LogoutButton/LogoutButton.tsx";
import {FavoriteDogsCard} from "../components/FavoriteDogsCard/FavoriteDogsCard.tsx";

export const Main = () => {
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [ageMin, setAgeMin] = useState<string>("");
    const [ageMax, setAgeMax] = useState<string>("");
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [dogData, setDogData] = useState<Dog[]>([]);
    const sort = useSelector((state: RootState) => state.filter.sort)
    const sortDirection = useSelector((state: RootState) => state.filter.sortDirection)

    //for clearing out filters and rerunning search
    const [filtersCleared, setFiltersCleared] = useState(false);

    // for modal
    const [matchBtnPressed, setMatchBtnPressed] = useState<boolean>(false)
    const [matchDetails, setMatchDetails] = useState<Dog[]>([]);

    // for pagination
    const [page, setPage] = useState(0);
    const pageSize = 25;
    const [totalDogs, setTotalDogs] = useState<number>(0);


    const {data: defaultSearchData} = useSearchDogsQuery({
        sort: `${sort}:${sortDirection}`,
        size: pageSize,
        from: page * pageSize
    }) as { data?: DogSearchResponse };
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();
    const [triggerSearch, {data: filteredData}] = useLazySearchDogsQuery();
    const dispatch = useDispatch();
    const hasFetchedDefaultData = useRef(false);

    const handleClick = () => {
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

    const handleClearClick = () => {
        dispatch(resetFilters());
        dispatch(resetSortDirection());
        dispatch(setSort('breed'));

        // so form data will be reset
        setAgeMin('');
        setAgeMax('');
        setZipCodes([]);
        setSelectedBreeds([]);

        // Set the state to indicate filters are cleared
        setFiltersCleared(true);
    };

// Trigger search only when filtersCleared is true
    useEffect(() => {
        if (filtersCleared) {
            triggerSearch({
                breeds: [],
                ageMin: '',
                ageMax: '',
                zipCodes: [],
                sort: `${sort}:${sortDirection}`,
                size: pageSize,
                from: page * pageSize
            });
            setFiltersCleared(false);
        }
    }, [filtersCleared, page, sort, sortDirection, triggerSearch]);


    // sets the data shown to users by default
    useEffect(() => {
        if (!defaultSearchData || !defaultSearchData?.resultIds?.length || hasFetchedDefaultData.current) {
            return;
        }

        (async () => {
            try {
                setTotalDogs(defaultSearchData.total)
                const response = await fetchDogDetails(defaultSearchData.resultIds).unwrap();
                setDogData(response);
                hasFetchedDefaultData.current = true;
            } catch (error) {
                console.log(`something went wrong fetching default dogs: ${error}`);
            }
        })();
    }, [defaultSearchData, fetchDogDetails, hasFetchedDefaultData]);

    // sets filtered data
    useEffect(() => {
        if (!filteredData) {
            return;
        }
        (async () => {
            try {
                setTotalDogs(filteredData.total)
                const response = await fetchDogDetails(filteredData.resultIds).unwrap();
                setDogData(response);
            } catch (error) {
                console.log(`something went wrong with fetching filtered dogs: ${error}`);
            }
        })();
    }, [fetchDogDetails, filteredData]);

    return (
        <>
            <Row className='pt-3'>
                <Col xs={12} className='d-flex justify-content-end'>
                    <MatchButton setMatchDetails={setMatchDetails} setMatchBtnPressed={setMatchBtnPressed}/>
                    <LogoutButton/>
                </Col>
            </Row>
            <Row className="py-3">
                <Col xs={12} md={12} lg={6} xl={3}>
                    <FiltersCard
                        handleClick={handleClick}
                        handleClearClick={handleClearClick}
                        selectedBreeds={selectedBreeds}
                        zipCodes={zipCodes}
                        setSelectedBreeds={setSelectedBreeds}
                        setAgeMin={setAgeMin}
                        setAgeMax={setAgeMax}
                        setZipCodes={setZipCodes}
                    />
                    <FavoriteDogsCard/>
                </Col>
                <Col xs={12} lg={6} xl={9} className='mt-5 mt-lg-0'>
                    <DogCards data={dogData}/>
                </Col>
                <Col xs={12} className='mt-3 d-flex justify-content-center'>
                    <Paginator
                        first={page * pageSize}
                        rows={pageSize}
                        totalRecords={totalDogs || 0}
                        onPageChange={(e) => {
                            setPage(e.page);
                            triggerSearch({
                                breeds: selectedBreeds,
                                ageMin: ageMin,
                                ageMax: ageMax,
                                zipCodes: zipCodes,
                                sort: `${sort}:${sortDirection}`,
                                size: pageSize,
                                from: e.page * pageSize,
                            });
                        }}
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
