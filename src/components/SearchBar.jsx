export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by character name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-300 focus:ring focus:outline-none"
    />
  );
}
