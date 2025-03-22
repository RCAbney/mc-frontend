const TraitTag = ({ traits }) => {
    const traitArray = Array.isArray(traits) 
        ? traits 
        : traits.split(',').map(trait => trait.trim());
    
    const formattedTraits = traitArray.map(trait => trait.toUpperCase().trim());
    
    return (
        <span className="italic font-bold">
            {formattedTraits.join('. ')}
        </span>
    );
};

export default TraitTag; 