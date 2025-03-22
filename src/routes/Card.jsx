import { useParams } from "react-router";
import { useFetchCard } from "../queryHooks/fetchCard";
import { parseText } from "../utils/textParser.jsx";
import TraitTag from "../components/TraitTag";
import MarvelIcon from "../components/MarvelIcon";

const Card = () => {
    const { code } = useParams();
    const { data: card, isLoading, error } = useFetchCard(code);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="card">
                    <h1 className="text-xl font-bold">{card[0].is_unique ? <MarvelIcon iconType="u" /> : ""} {card[0].name}</h1>
                    <p>
                        {card[0].thwart && <span>Thwart: {card[0].thwart}.</span>}&nbsp;
                        {card[0].attack && <span>Attack: {card[0].attack}.</span>}&nbsp;
                        {card[0].defense && <span>Defense: {card[0].defense}.</span>}
                    </p>
                    <p>
                        {card[0].health && <span>Health: {card[0].health}.</span>}&nbsp;
                        {card[0].hand_size && <span>Hand Size: {card[0].hand_size}.</span>}&nbsp;
                    </p>
                    {card[0].traits && (
                        <p>
                            <TraitTag traits={card[0].traits} />
                        </p>
                    )}
                    <div className="pl-4 py-3 mt-4 border-l-2">
                        {parseText(card[0].text)}
                    </div>
                    <div className="mt-4">
                        {card[0].flavor && <p className="italic text-sm">{card[0].flavor}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
