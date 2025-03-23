const CardFlavorText = ({ flavor }) => {

        return (
            <div className="px-4">
                {flavor && (
            <p className="italic text-sm">{flavor}</p>
        )}
    </div>
    );
};

export default CardFlavorText;