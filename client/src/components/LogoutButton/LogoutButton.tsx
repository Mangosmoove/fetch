import {useLogoutUserMutation} from "../../api/api.ts";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetFilters} from "../../redux/slices/filter.slice.ts";

export const LogoutButton = () => {
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            await logoutUser({});
            dispatch(resetFilters())
            navigate("/");
        } catch (error) {
            console.error(`Something went wrong logging user out: ${error}`);
        }
    }

    return (
        <Button variant='danger' className='ms-3' onClick={handleClick}>Logout</Button>
    )
}