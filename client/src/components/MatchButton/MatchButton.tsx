import {Button} from "react-bootstrap";
import {useLazyGetDogDetailsQuery, useLazyGetDogMatchQuery} from "../../api/api.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {Dog} from "../../utils/type.ts";
import * as React from "react";

interface MatchButtonProps {
    setMatchDetails:  React.Dispatch<React.SetStateAction<Dog[]>>;
}

export const MatchButton = ({setMatchDetails}: MatchButtonProps) => {
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();
    const [fetchMatch] = useLazyGetDogMatchQuery();
    const favorites = useSelector((state: RootState) => state.favorites.ids);

    const handleClick = async () => {
        try {
            const matchResponse = await fetchMatch(favorites).unwrap();
            const dogDetailsResponse = await fetchDogDetails(matchResponse).unwrap();
            // TODO: convert string to str []
            setMatchDetails(dogDetailsResponse);
        } catch (error) {
            console.log(`something went wrong: ${error}`);
        }
    }

    return (
        <Button variant='warning' disabled={!favorites.length} onClick={handleClick}>Find my match!</Button>
    )
}
