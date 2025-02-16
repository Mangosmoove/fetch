import {Modal} from "react-bootstrap";
import {DogCards} from "../DogCards/DogCards.tsx";
import {Dog} from "../../utils/type.ts";

interface MatchedDogModalProps {
    matchedDog: Dog[];  // Define the prop type to expect a Dog object
}

export const MatchedDogModal = ({matchedDog}: MatchedDogModalProps) => {
    return (
        <Modal>
            <Modal.Header closeButton/>
            <Modal.Body>
                <DogCards data={matchedDog}/>
            </Modal.Body>
        </Modal>
    )
};
