import { useHeroes } from './queryHooks/fetchHeroes';

function App() {
    const { data: heroes, isLoading, error } = useHeroes();

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <p>Loading heroes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <p className="text-red-500">Error: {error.message}</p>
            </div>
        );
    }

    const uniqueHeroNames = [...new Set(heroes?.map(hero => hero.name) || [])];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Marvel Champions Heroes <span className="font-icons before:content-['I']" /></h1>
            <ul className="space-y-2">
                {uniqueHeroNames.map((heroName) => (
                    <li key={heroName} className="text-lg">
                        {heroName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
