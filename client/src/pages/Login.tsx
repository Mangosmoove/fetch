import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { LoginRequest } from "../utils/type";
import { useAuthenticateUserInfoMutation } from "../api/api";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const [authenticateUser] = useAuthenticateUserInfoMutation();

  const onSubmit = async (formData: LoginRequest) => {
    await authenticateUser(formData);
  };

  return (
    <Row className="h-100 justify-content-center align-items-center flex-column">
      <Col xs={4} className="">
        <Card className="p-5" bg="light">
          <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...register("name", { required: "Name is required" })}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: "Email is required" })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Stack>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
