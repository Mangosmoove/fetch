import {Card, Col, Row, Stack} from "react-bootstrap";
import {Dog} from "../../utils/type.ts";

interface DogProps {
    data: Dog[];
}

export const DogCards = ({data}: DogProps) => {
    return (
        <Row className="gy-4 mx-3">
            {data.map((dog: Dog) => (
                <Col key={dog.id} xs={12} sm={6} md={4} lg={4}>
                    <Card style={{minHeight: "300px"}}>
                        <Row className='my-2'>
                            <Col className='d-flex justify-content-end align-items-center'>
                                <h5 className='mb-0'>Favorite</h5>
                                <i className="mx-2 bi bi-star fs-3"></i>
                            </Col>
                        </Row>

                        <Card.Img variant="top" src={dog.img} alt={`Image of ${dog.name}`} style={{height: "200px", objectFit: "cover"}} />
                        <Card.Body>
                            <h5 className='fw-bold text-center'>{dog.name}</h5>
                            <Stack direction={'horizontal'} gap={3} className='d-flex justify-content-center'>
                                <p><span className='fw-bold'>Age</span>: {dog.age}</p>
                                <p><span className='fw-bold'>Breed</span>: {dog.breed}</p>
                                <p><span className='fw-bold'>Zipcode</span>: {dog.zip_code}</p>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
