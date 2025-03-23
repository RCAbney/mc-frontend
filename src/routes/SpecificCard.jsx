import { useParams } from "react-router";
import { useFetchCard } from "../queryHooks/fetchCard.js";
import Card from "../components/Card.jsx";

const SpecificCard = () => {
    const { code } = useParams();
    const { data: cards, isLoading, error } = useFetchCard(code);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {cards.map((card) => (
                <Card key={card.code} card={card} />
            ))}
        </div>
    );
};

export default SpecificCard;