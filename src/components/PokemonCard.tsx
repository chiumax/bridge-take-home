import Image from "next/image";
import PokemonDetailsCard from "./PokemonDetailsCard";
import { useState } from "react";
import { PokemonDetails } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  // ideally a more robust modal component would keep open state internally
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative w-32 h-32">
          <Image
            src={pokemon.imageUrl}
            alt={`${pokemon.name} pokemon`}
            fill
            className="object-contain"
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <h2 className="text-lg font-semibold capitalize mb-2">
            {pokemon.name}
          </h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showDetails && (
        <PokemonDetailsCard
          pokemon={pokemon}
          onExitComplete={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
