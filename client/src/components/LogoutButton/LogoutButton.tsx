import {useLogoutUserMutation} from "../../api/api.ts";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await logoutUser({});
            navigate("/");
        } catch (error) {
            console.error(`Something went wrong logging user out: ${error}`);
        }
    }

    return (
        <Button variant='danger' className='ms-3' onClick={handleClick}>Logout</Button>
    )
}