import {Button, Card, Form, Stack} from "react-bootstrap"
import {BreedFilter} from "../BreedFilter/BreedFilter.tsx";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../../redux/slices/filter.slice.ts";
import {RootState} from "../../redux/store.ts";

interface FiltersCardProps {
    handleClick: () => void;
    selectedBreeds: string[];
    setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
    setAgeMin: React.Dispatch<React.SetStateAction<string>>;
    setAgeMax: React.Dispatch<React.SetStateAction<string>>;
    setZipCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FiltersCard = ({
                                handleClick,
                                selectedBreeds,
                                setSelectedBreeds,
                                setAgeMin,
                                setAgeMax,
                                setZipCodes,
                            }: FiltersCardProps) => {
    const dispatch = useDispatch();
    const sort = useSelector((state: RootState) => state.filter.sort)

    const handleSortClick = (sortBy: string) => {
        dispatch(setSort(`${sortBy}:asc`))
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
                                onChange={(e) => setAgeMin(e.target.value)}
                            />
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
                                onChange={(e) => setAgeMax(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Form>
                        <Form.Group>
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Zip Code"
                                // onChange={(e) => setZipCodes(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button onClick={handleClick}>Search</Button>
                </Stack>
                <h5 className='mt-3'>Sort By</h5>
                <Stack gap={3} direction={'horizontal'}>
                    <Button variant={sort === 'age:asc' || sort === 'age:desc' ? "primary" : "outline-primary"}
                            onClick={() => handleSortClick('age')}>Age</Button>
                    <Button variant={sort === 'breed:asc' || sort === 'breed.desc' ? "primary" : "outline-primary"}
                            onClick={() => handleSortClick('breed')}>Breed</Button>
                    <Button variant={sort === 'name:asc' || sort === 'name:desc' ? "primary" : "outline-primary"}
                            onClick={() => handleSortClick('name')}>Name</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}
