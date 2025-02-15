import {Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import {LoginRequest} from "../utils/type";
import {useAuthenticateUserInfoMutation} from "../api/api";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {loginSchema, LoginSchemaType} from "../utils/loginValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema), // Apply Zod validation
    });
    const [authenticateUser] = useAuthenticateUserInfoMutation();
    const navigate = useNavigate();

    const onSubmit = async (formData: LoginRequest) => {
        const authenticated = await authenticateUser(formData);

        if (authenticated.error) {
            console.log("oh no");
            // throw some error message in card that says invalid credentials, try again
        } else {
            navigate("/overview");
        }
    };

    return (
        <Row className="h-100 justify-content-center align-items-center flex-column">
            <Col xs={4}>
                <Card className="p-5" bg="light">
                    <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap={3}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    {...register("name", {required: "Name is required"})}
                                    isInvalid={!!errors.name}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    {...register("email", {required: "Email is required"})}
                                    isInvalid={!!errors.email}
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
