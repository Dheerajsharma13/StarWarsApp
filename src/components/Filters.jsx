export default function Filters({ species, planets, films, setFilters }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      
 
      <select
        onChange={(e) => setFilters((f) => ({ ...f, species: e.target.value }))}
        className="p-3 rounded-xl border"
      >
        <option value="">Filter by Species</option>
        {species.map((s) => (
          <option key={s.url} value={s.url}>
            {s.name}
          </option>
        ))}
      </select>

       
      <select
        onChange={(e) =>
          setFilters((f) => ({ ...f, homeworld: e.target.value }))
        }
        className="p-3 rounded-xl border"
      >
        <option value="">Filter by Homeworld</option>
        {planets.map((p) => (
          <option key={p.url} value={p.url}>
            {p.name}
          </option>
        ))}
      </select>

      
      <select
        onChange={(e) => setFilters((f) => ({ ...f, film: e.target.value }))}
        className="p-3 rounded-xl border"
      >
        <option value="">Filter by Film</option>
        {films.map((f) => (
          <option key={f.url} value={f.url}>
            {f.title}
          </option>
        ))}
      </select>

    </div>
  );
}
