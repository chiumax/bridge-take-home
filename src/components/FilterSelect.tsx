import { useState } from "react";

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

interface FilterSelectProps {
  onSelect: (type: string | null) => void;
}

export default function FilterSelect({ onSelect }: FilterSelectProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const type = value === "" ? null : value;
    setSelectedType(type);
    onSelect(type);
  };

  const handleClear = () => {
    setSelectedType(null);
    onSelect(null);
  };

  return (
    <div className="w-full max-w-xs mb-4 flex gap-2">
      <select
        className="select select-bordered w-full dark:bg-gray-700"
        value={selectedType || ""}
        onChange={handleChange}
      >
        <option value="">All Types</option>
        {POKEMON_TYPES.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type}
          </option>
        ))}
      </select>
      {selectedType && (
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
        >
          Clear
        </button>
      )}
    </div>
  );
}
