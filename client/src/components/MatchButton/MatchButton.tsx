import {Button} from "react-bootstrap";
import {useLazyGetDogDetailsQuery} from "../../api/api.ts";

export const MatchButton = () => {
    const [fetchDogDetails] = useLazyGetDogDetailsQuery();
    // TODO: in parent component, pass: setDogDetails

    const handleClick = async () => {
        // TODO: call match api
        //         if (!slice.matches.length) {
        //             return some text like add some favorites first;
        //         }
        //             try {
        //                 const matchResponse = await fetchDogMatch(slice.ids);
        //                 setDogId(response);
        //                 const dogDetailsResponse = await fetchDogDetails(single_id);
        //                  setDogDetails(dogDetailsResponse)
        //            } catch (error) {
        //                 console.log(`something went wrong: ${error}`);
        //            }

        return;
    }
    return (
        <Button variant='warning' onClick={handleClick}>Find my match!</Button>
    )
}
