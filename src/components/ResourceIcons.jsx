import MarvelIcon from "./MarvelIcon";

const ResourceIcons = ({resourcesArr}) => {

    const totalIcons = resourcesArr.reduce((acc, resource) => {
        return acc + resource.count;
    }, 0);

    if (totalIcons === 0) return null;

    return (
        <div>
            <p>Resource:&nbsp;
            {resourcesArr.map((resource, index) => {
                return (
                resource.count !== 0 && <MarvelIcon key={index} iconType={resource.type} />
            )})}
            </p>
        </div>
    )
}

export default ResourceIcons;