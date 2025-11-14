import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import useDebounce from "../hooks/useDebounce";

export default function Home() {
  const { logout } = useAuth();

  const [allCharacters, setAllCharacters] = useState([]);    
  const [characters, setCharacters] = useState([]);          

  const [species, setSpecies] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);

  const [filters, setFilters] = useState({
    species: "",
    homeworld: "",
    film: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 8;

  const [selected, setSelected] = useState(null);

 
  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        const data = await fetchAllCharacters();
        setAllCharacters(data);
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch characters");
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  
  useEffect(() => {
    let filtered = [...allCharacters];

    // Search
    if (debouncedSearch) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Species (URL match)
  if (filters.species) {
    filtered = filtered.filter(
      (c) => c.species.length > 0 && c.species[0] === filters.species
    );
  }

  // Homeworld  
  if (filters.homeworld) {
    filtered = filtered.filter((c) => c.homeworld === filters.homeworld);
  }

  // Film  
  if (filters.film) {
    filtered = filtered.filter((c) => c.films.includes(filters.film));
  }

    setCharacters(filtered);
    setPage(1);  
  }, [debouncedSearch, filters, allCharacters]);

  //  Pagination logic
  const start = (page - 1) * perPage;
  const paginated = characters.slice(start, start + perPage);

  // Load filter dropdown data
  useEffect(() => {
    async function fetchFilters() {
      try {
        const s = await fetch("https://swapi.dev/api/species/");
        const sData = await s.json();
        setSpecies(sData.results);

        const p = await fetch("https://swapi.dev/api/planets/");
        const pData = await p.json();
        setPlanets(pData.results);

        const f = await fetch("https://swapi.dev/api/films/");
        const fData = await f.json();
        setFilms(fData.results);
      } catch (err) {
        console.error("Filters fetch failed:", err);
      }
    }
    fetchFilters();
  }, []);

  
  async function fetchAllCharacters() {
    let results = [];
    let next = "https://swapi.dev/api/people/";

    while (next) {
      const res = await fetch(next);
      const data = await res.json();
      results = [...results, ...data.results];
      next = data.next;
    }

    return results;
  }

  return (
    <div className="p-6">
     
      <button
        onClick={logout}
        className="bg-red-600 text-white px-6 py-2 rounded-xl mb-4"
      >
        Logout
      </button>

      
      <SearchBar search={search} setSearch={setSearch} />
 
      <Filters
        species={species}
        planets={planets}
        films={films}
        setFilters={setFilters}
      />

      
      {loading && <p className="mt-10 text-center">Loading...</p>}
      {error && <p className="mt-10 text-center text-red-600">{error}</p>}

      {/* No results */}
      {!loading && paginated.length === 0 && (
        <p className="mt-10 text-center text-xl font-semibold text-red-500">
          No characters found
        </p>
      )}

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {paginated.map((c) => (
          <CharacterCard
            key={c.name}
            character={c}
            onClick={() => setSelected(c)}
          />
        ))}
      </div>

   
      {paginated.length > 0 && (
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-40"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-40"
            disabled={start + perPage >= characters.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

  
      {selected && (
        <CharacterModal
          character={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
