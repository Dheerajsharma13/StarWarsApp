import { useEffect, useState } from "react";

export default function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    if (!character) return;

    async function fetchHomeworld() {
      try {
        const response = await fetch(character.homeworld);
        const data = await response.json();
        setHomeworld(data);
      } catch (err) {
        console.error("Homeworld fetch failed:", err);
      }
    }

    fetchHomeworld();
  }, [character]);

  if (!character) return null;

  const date = character.created
    ? new Date(character.created).toLocaleDateString("en-GB")
    : "Unknown";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>

        <p><strong>Height:</strong> {character.height / 100} m</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Date Added:</strong> {date}</p>
        <p><strong>Films:</strong> {character.films.length} films</p>

        <h3 className="text-xl font-semibold mt-4">Homeworld</h3>

        {homeworld ? (
          <div>
            <p><strong>Name:</strong> {homeworld.name}</p>
            <p><strong>Terrain:</strong> {homeworld.terrain}</p>
            <p><strong>Climate:</strong> {homeworld.climate}</p>
            <p><strong>Population:</strong> {homeworld.population}</p>
          </div>
        ) : (
          <p>Loading homeworld...</p>
        )}

        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
