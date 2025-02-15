import {Button, Card, Col, Form, Row} from "react-bootstrap"
import {BreedFilter} from "../BreedFilter/BreedFilter.tsx";
import {useState} from "react";

interface FiltersCardProps {
    handleClick: () => void;
}

export const FiltersCard = ({handleClick}: FiltersCardProps) => {
    const [minAge, setMinAge] = useState<number>(0);
    const [maxAge, setMaxAge] = useState<number>(0);
    const [zipCode, setZipCode] = useState<number>(0);
    return (
        <Card>
            <Card.Body>
                <Row className="align-items-end">
                    <Col xs={4}>
                        <BreedFilter/>
                    </Col>
                    <Col xs={2}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Minimum Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    max={14}
                                    placeholder="Enter years"
                                    onChange={(e) => setMinAge(Number(e.target.value))}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={2}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Maximum Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    max={14}
                                    placeholder="Enter years"
                                    onChange={(e) => setMaxAge(Number(e.target.value))}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={2}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Zip Code"
                                    onChange={(e) => setZipCode(Number(e.target.value))}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <Button onClick={handleClick}>Search</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}