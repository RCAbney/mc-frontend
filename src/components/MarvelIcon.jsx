const MarvelIcon = ({ iconType = "I" }) => {
    return (
        <span className="font-icons inline-block text-base">
            {iconType}
        </span>
    );
};

export default MarvelIcon;