import { parseText } from "../utils/textParser.jsx";
import TraitTag from "./TraitTag.jsx";
import MarvelIcon from "./MarvelIcon.jsx";
import ResourceIcons from "./ResourceIcons.jsx";
import CardFlavorText from "./CardFlavorText.jsx";

const Card = ({ card }) => {
    const totalResources = [
        {
            type: "P",
            count: card.resource_physical,
        },
        {
            type: "E",
            count: card.resource_energy,
        },
        {
            type: "M",
            count: card.resource_mental,
        },
        {
            type: "W",
            count: card.resource_wild,
        },
    ];

    return (
        <div className="p-4">
            <div className="flex flex-col-reverse sm:flex-row gap-4">

                <div className="border-slate-300 border rounded-md max-w-xl">
                    <div className="flex flex-col">
                        <div className="bg-slate-100 border-b border-slate-300 p-4 rounded-t-md">
                            <h1 className="text-xl font-bold">
                                {card.is_unique ? (
                                    <MarvelIcon iconType="u" />
                                ) : (
                                    ""
                                )}{" "}
                                {card.name}
                            </h1>
                            {card.subname && (
                                <p className="text-sm">{card.subname}</p>
                            )}
                        </div>
                        <div className="p-4">
                            {card.faction_code !== card.type_code && (
                                <p className="capitalize">
                                    {card.faction_code}
                                </p>
                            )}
                            <p className="capitalize font-bold">
                                {card.type_code}{" "}
                                {card.stage !== null && `Stage ${card.stage}`}
                            </p>

                            {card.traits && card.traits.length > 0 && (
                                <p>
                                    <TraitTag traits={card.traits} />
                                </p>
                            )}
                        </div>
                        {card.type_code !== "main_scheme" && (
                            <div className="px-4">
                                {card.cost !== null && (
                                    <p className="capitalize">
                                        Cost:{card.cost}
                                    </p>
                                )}
                                <div className="flex">
                                    {card.thwart !== null && (
                                        <span>
                                            Thwart: {card.thwart}
                                            {card.thwart_star && (
                                                <MarvelIcon iconType="s" />
                                            )}
                                            .&nbsp;
                                        </span>
                                    )}

                                    {card.recover !== null && (
                                        <span>
                                            Recovery: {card.recover}
                                            {card.recover_star && (
                                                <MarvelIcon iconType="s" />
                                            )}
                                            .&nbsp;
                                        </span>
                                    )}
                                    {card.attack !== null && (
                                        <span>
                                            Attack: {card.attack}
                                            {card.attack_star && (
                                                <MarvelIcon iconType="s" />
                                            )}
                                            .&nbsp;
                                        </span>
                                    )}
                                    {card.defense !== null && (
                                        <span>
                                            Defense: {card.defense}
                                            {card.defense_star && (
                                                <MarvelIcon iconType="s" />
                                            )}
                                            .
                                        </span>
                                    )}
                                    {card.scheme !== null && (
                                        <span>
                                            Scheme: {card.scheme}
                                            {card.scheme_star && (
                                                <MarvelIcon iconType="s" />
                                            )}
                                            .
                                        </span>
                                    )}
                                </div>
                                <div className="flex">
                                    {card.health !== null && (
                                        <span>
                                            Health: {card.health}
                                            {card.health_per_hero && (
                                                <MarvelIcon iconType="g" />
                                            )}
                                            .&nbsp;
                                        </span>
                                    )}
                                    {card.hand_size && (
                                        <span>
                                            Hand Size: {card.hand_size}.
                                        </span>
                                    )}
                                </div>
                                <ResourceIcons resourcesArr={totalResources} />
                            </div>
                        )}
                        {card.flavor && card.type_code === "main_scheme" && (
                            <CardFlavorText flavor={card.flavor} />
                        )}
                        {card.text && (
                            <div className="my-4 ml-4 px-4 py-3 border-l-2">
                                {parseText(card.text)}
                            </div>
                        )}
                        {card.flavor && card.type_code !== "main_scheme" && (
                            <CardFlavorText flavor={card.flavor} />
                        )}
                    </div>
                    <div className="mb-4" />
                </div>
                <img
                    className="max-w-[419px]"
                    src={`https://marvelcdb.com/bundles/cards/${card.code}.png`}
                    alt={card.name}
                />
            </div>
        </div>
    );
};

export default Card;
