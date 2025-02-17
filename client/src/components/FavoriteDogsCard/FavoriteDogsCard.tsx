import {RootState} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {useGetDogDetailsQuery} from "../../api/api.ts";
import {Button, Card} from "react-bootstrap";
import {Dog} from "../../utils/type.ts";
import {resetFavorites} from "../../redux/slices/favorites.slice.ts";
import {useEffect, useState} from "react";

export const FavoriteDogsCard = () => {
    const favoriteIds = useSelector((state: RootState) => state.favorites.ids)
    const {data: dogs} = useGetDogDetailsQuery(favoriteIds)
    const dispatch = useDispatch();
    const [dogData, setDogData] = useState<Dog[]>([]);

    useEffect(() => {
        if (dogs) {
            setDogData(dogs);
        }
    }, [dogs]);

    const handleClick = () => {
        dispatch(resetFavorites())
        setDogData([])
    }

    return (
        <Card className='mt-3'>
            <Card.Body>
                <h5>Favorite Dogs</h5>
                {dogData.length ? (
                    <ul>
                        {dogData?.map((dog: Dog) => (
                            <li key={dog.id}>{dog.name}-{dog.breed}</li>
                        ))}
                    </ul>
                ) : <p>Click on a star to favorite a dog!</p>}
                <Button className='w-100' disabled={!dogData.length} onClick={handleClick}>Clear Favorites</Button>
            </Card.Body>
        </Card>
    )
}