export default function CharacterCard({ character, onClick }) {
  return (
    <div
      className="rounded-xl p-4 bg-gray-800 text-white cursor-pointer hover:opacity-80"
      onClick={onClick}
    >
      <img
        src={`https://picsum.photos/200?random=${character.name}`}
        className="rounded-xl w-full h-40 object-cover"
      />
      <h3 className="mt-3 text-lg font-bold">{character.name}</h3>
    </div>
  );
}
