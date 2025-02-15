import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import backgroundImage from "../../assets/background.svg";
// image from: https://www.freepik.com/free-vector/colorful-dog-cat-paw-prints-pattern-background_10701685.htm#fromView=keyword&page=1&position=17&uuid=0318be86-3f42-4c6b-a4ac-fbf00b21795e&query=Dog+Wallpaper

export const Layout = () => {
    return (
        <Container
            fluid
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}
        >
            <Outlet/>
        </Container>
    );
};
