import { Card } from "react-bootstrap";

interface DogCardsProps {
  dogImage: string;
  dogName: string;
  dogAge: number;
  dogBreed: string;
}

export const DogCards = ({
  dogImage,
  dogName,
  dogAge,
  dogBreed,
}: DogCardsProps) => {
  return (
    <Card>
      <Card.Body>
        {dogImage}
        <h5>{dogName}</h5>
        <p>Breed: {dogBreed}</p>
        <p>Age: {dogAge}</p>
      </Card.Body>
    </Card>
  );
};
