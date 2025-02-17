import {Button, Card, Form, Stack} from "react-bootstrap"
import {BreedFilter} from "../BreedFilter/BreedFilter.tsx";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSort, toggleSortDirection} from "../../redux/slices/filter.slice.ts";
import {RootState} from "../../redux/store.ts";
import {Chips} from "primereact/chips";

interface FiltersCardProps {
    handleClick: () => void;
    handleClearClick: () => void;
    selectedBreeds: string[];
    zipCodes: string[];
    setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
    setAgeMin: React.Dispatch<React.SetStateAction<string>>;
    setAgeMax: React.Dispatch<React.SetStateAction<string>>;
    setZipCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FiltersCard = ({
                                handleClick,
                                handleClearClick,
                                selectedBreeds,
                                zipCodes,
                                setSelectedBreeds,
                                setAgeMin,
                                setAgeMax,
                                setZipCodes,
                            }: FiltersCardProps) => {
    const dispatch = useDispatch();
    const sort = useSelector((state: RootState) => state.filter.sort)
    const sortDirection = useSelector((state: RootState) => state.filter.sortDirection)
    const ageMin = useSelector((state: RootState) => state.filter.ageMin)
    const ageMax = useSelector((state: RootState) => state.filter.ageMax)

    const handleSortClick = (sortBy: string) => {
        dispatch(setSort(sortBy))
    }

    const handleSortDirectionToggle = () => {
        dispatch(toggleSortDirection())
    }

    return (
        <Card>
            <Card.Body>
                <h5>Filter</h5>
                <Stack gap={3}>
                    <BreedFilter selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds}/>
                    <Form>
                        <Form.Group>
                            <Form.Label>Minimum Age</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                max={14}
                                placeholder="Enter years"
                                defaultValue={ageMin}
                                isInvalid={isNaN(Number(ageMin)) || Number(ageMin) < 0 || Number(ageMin) > 14}
                                onChange={(e) => setAgeMin(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid number between 0 and 14.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group>
                            <Form.Label>Maximum Age</Form.Label>
                            <Form.Control
                                type="number"
                                min={0}
                                max={14}
                                placeholder="Enter years"
                                defaultValue={ageMax}
                                isInvalid={isNaN(Number(ageMax)) || Number(ageMax) < 0 || Number(ageMax) > 14}
                                onChange={(e) => setAgeMax(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid number between 0 and 14.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Chips
                        className='p-fluid'
                        value={zipCodes}
                        onChange={(e) => setZipCodes(e.value || [])}
                        keyfilter="int"
                        placeholder="Enter zip codes"
                    />
                </Stack>
                <h5 className='mt-3'>Sort By</h5>
                <div>
                    <p>Category</p>
                    <Stack gap={3} direction={'horizontal'}>
                        <Button variant={sort === 'age' ? "primary" : "outline-primary"}
                                onClick={() => handleSortClick('age')}>Age</Button>
                        <Button variant={sort === 'breed' ? "primary" : "outline-primary"}
                                onClick={() => handleSortClick('breed')}>Breed</Button>
                        <Button variant={sort === 'name' ? "primary" : "outline-primary"}
                                onClick={() => handleSortClick('name')}>Name</Button>
                    </Stack>
                </div>
                <Form className='mt-3'>
                    <Form.Label>Sort Direction</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            inline
                            id="sort-asc"
                            label="Ascending"
                            value="asc"
                            checked={sortDirection === "asc"}
                            onChange={handleSortDirectionToggle}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            id="sort-desc"
                            label="Descending"
                            value="desc"
                            checked={sortDirection === "desc"}
                            onChange={handleSortDirectionToggle}
                        />
                    </div>
                </Form>
                <Button onClick={handleClick} className={'w-100 mt-4'}>Search</Button>
                <Button variant='outline-primary' className={'w-100 mt-3'} onClick={handleClearClick}>Clear
                    Filters</Button>
            </Card.Body>
        </Card>
    )
}
