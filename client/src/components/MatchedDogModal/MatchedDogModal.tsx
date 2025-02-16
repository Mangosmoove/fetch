import {Modal} from "react-bootstrap";
import {DogCards} from "../DogCards/DogCards.tsx";
import {Dog} from "../../utils/type.ts";
import * as React from "react";

interface MatchedDogModalProps {
    matchedDog: Dog[];
    matchBtnPressed: boolean;
    setMatchBtnPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MatchedDogModal = ({matchedDog, matchBtnPressed, setMatchBtnPressed}: MatchedDogModalProps) => {
    const handleClose = () => {
        setMatchBtnPressed(false);
    }

    return (
        <Modal show={matchBtnPressed} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your Match!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DogCards data={matchedDog} isMatchedModal={true}/>
            </Modal.Body>
        </Modal>
    )
};
