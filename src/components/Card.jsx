import { useParams } from "react-router";
import { useFetchCard } from "../queryHooks/fetchCard.js";
import { parseText } from "../utils/textParser.jsx";
import TraitTag from "./TraitTag.jsx";
import MarvelIcon from "./MarvelIcon.jsx";

const Card = () => {
    const { code } = useParams();
    const { data: card, isLoading, error } = useFetchCard(code);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="card">
                    <h1 className="text-xl font-bold">{card.is_unique ? <MarvelIcon iconType="u" /> : ""} {card.name}</h1>
                    <p>
                        {card.thwart && <span>Thwart: {card.thwart}.</span>}&nbsp;
                        {card.attack && <span>Attack: {card.attack}.</span>}&nbsp;
                        {card.defense && <span>Defense: {card.defense}.</span>}
                    </p>
                    <p>
                        {card.health && <span>Health: {card.health}.</span>}&nbsp;
                        {card.hand_size && <span>Hand Size: {card.hand_size}.</span>}&nbsp;
                    </p>
                    {card.traits && (
                        <p>
                            <TraitTag traits={card.traits} />
                        </p>
                    )}
                    <div className="pl-4 py-3 mt-4 border-l-2">
                        {parseText(card.text)}
                    </div>
                    <div className="mt-4">
                        {card.flavor && <p className="italic text-sm">{card.flavor}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
