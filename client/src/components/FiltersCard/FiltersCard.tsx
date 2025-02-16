import {Button, Card, Form, Stack} from "react-bootstrap"
import {BreedFilter} from "../BreedFilter/BreedFilter.tsx";
import * as React from "react";

interface FiltersCardProps {
    handleClick: () => void;
    selectedBreeds: string[];
    setSelectedBreeds: React.Dispatch<React.SetStateAction<string[]>>;
    setAgeMin: React.Dispatch<React.SetStateAction<string>>;
    setAgeMax: React.Dispatch<React.SetStateAction<string>>;
    setZipCode: React.Dispatch<React.SetStateAction<string[]>>;
    setSort: React.Dispatch<React.SetStateAction<string>>;
}

export const FiltersCard = ({
                                handleClick,
                                selectedBreeds,
                                setSelectedBreeds,
                                setAgeMin,
                                setAgeMax,
                                setZipCode,
                                setSort
                            }: FiltersCardProps) => {
    const [btnFill, setBtnFill] = React.useState<string>(""); //TODO: this will default to what's in redux

    const handleSortClick = (sortBy: string) => {
        // TODO: ah we're gonna have to move this to redux bc it'll call the search query
        setSort(sortBy);
        setBtnFill(sortBy);
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
                                // onChange={(e) => setZipCode(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button onClick={handleClick}>Search</Button>
                </Stack>
                <h5 className='mt-3'>Sort By</h5>
                <Stack gap={3} direction={'horizontal'}>
                    <Button variant={btnFill === 'age' ? "primary" : "outline-primary"}
                            onClick={() => handleSortClick('age')}>Age</Button>
                    <Button variant={btnFill === 'breed' ? "primary" : "outline-primary"}
                            onClick={() => handleSortClick('breed')}>Breed</Button>
                    <Button variant={btnFill === 'name' ? "primary" : "outline-primary"}
                            onClick={() => handleSortClick('name')}>Name</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}
