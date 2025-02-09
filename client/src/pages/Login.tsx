import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";

export const Login = () => {
  return (
    <Row className="h-100 justify-content-center align-items-center flex-column">
      <Col xs={4} className="">
        <Card className="p-5" bg="light">
          <Form className="w-100">
            <Stack gap={3}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
