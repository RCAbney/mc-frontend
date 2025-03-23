import { useRandomHero } from "../queryHooks/fetchRandomHero.js";
import Card from "../components/Card.jsx";

const RandomHero = () => {
    const { data: cards, isLoading, error, getNewRandomHero, isFetching } = useRandomHero();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
          <div className="p-4">

            <button
                disabled={isLoading || isFetching}
                onClick={getNewRandomHero}
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading || isFetching ? "Loading..." : "Get New Random Hero"}
            </button>
          </div>
            <div>
                {cards.map((card) => (
                    <Card key={card.code} card={card} />
                ))}
            </div>
        </div>
    );
};

export default RandomHero;