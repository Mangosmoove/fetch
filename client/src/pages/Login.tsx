import {Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import {LoginRequest} from "../utils/type";
import {useAuthenticateUserInfoMutation} from "../api/api";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {loginSchema, LoginSchemaType} from "../utils/loginValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });
    const [authenticateUser] = useAuthenticateUserInfoMutation();
    const navigate = useNavigate();

    const onSubmit = async (formData: LoginRequest) => {
        await authenticateUser(formData);
        navigate("/overview");
    };

    return (
        <Row className="vh-100 justify-content-center align-items-center">
            <Col xs={10} sm={8} lg={6} xl={4}>
                <Card className="p-5" bg="light">
                    <h5 className='text-center'>Login to find your dog buddy!</h5>
                    <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                        <Stack gap={3}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    {...register("name")}
                                    isInvalid={!!errors.name}
                                />
                                {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    {...register("email")}
                                    isInvalid={!!errors.email}
                                />
                                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
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
