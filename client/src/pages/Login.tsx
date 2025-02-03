import { Button, Col, Form, Row } from "react-bootstrap"

export const Login = () => {
    return (
        <Row className="h-100">
            <Col xs={6}>
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center"> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
      </Form>
            </Col>
            <Col xs={6} className="bg-primary">
                <div className="bg-primary" />
            </Col>
        </Row>

    )
}