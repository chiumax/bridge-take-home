import Image from "next/image";
import { useEffect } from "react";
import { PokemonDetails } from "@/types/pokemon";
import { usePokemonWeaknessByType } from "@/queries/usePokemonWeaknessByType";

interface PokemonDetailsCardProps {
  pokemon: PokemonDetails;
  onExitComplete: () => void;
}

export default function PokemonDetailsCard({
  pokemon,
  onExitComplete,
}: PokemonDetailsCardProps) {
  const { data: weaknesses } = usePokemonWeaknessByType(pokemon.types);

  useEffect(() => {
    const dialog = document.getElementById(
      `pokemon_modal_${pokemon.id}`
    ) as HTMLDialogElement;
    dialog?.showModal();

    const handleClose = () => {
      onExitComplete();
    };

    dialog?.addEventListener("close", handleClose);
    return () => dialog?.removeEventListener("close", handleClose);
  }, [pokemon.id, onExitComplete]);

  return (
    <>
      <dialog id={`pokemon_modal_${pokemon.id}`} className="modal">
        <div className="modal-box max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Image and basic info */}
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-4">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={`${pokemon.name} pokemon`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  #{String(pokemon.id).padStart(3, "0")}
                </p>
                <h1 className="text-2xl font-bold capitalize mb-4">
                  {pokemon.name}
                </h1>
                <div className="flex gap-2 flex-wrap justify-center mb-4">
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

              {/* Right column - Stats and details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Physical Traits
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Height</p>
                      <p>{(pokemon.height / 10).toFixed(1)}m</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Weight</p>
                      <p>{(pokemon.weight / 10).toFixed(1)}kg</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Stats</h2>
                  <div className="space-y-2">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.name} className="flex items-center">
                        <span className="w-32 text-sm capitalize">
                          {stat.name.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded">
                          <div
                            className="h-full bg-blue-500 rounded"
                            style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="ml-2 text-sm">{stat.base_stat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Abilities</h2>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability) => (
                      <span
                        key={ability.ability.name}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full capitalize"
                      >
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Weaknesses</h2>
                  <div className="flex flex-wrap gap-2">
                    {weaknesses?.map((weakness) =>
                      weakness?.double_damage_from.map((type) => (
                        <span
                          key={type.name}
                          className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full capitalize"
                        >
                          {type.name}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Moves</h2>
                  <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                    <div className="flex flex-wrap gap-2">
                      {pokemon.moves.map((move) => (
                        <span
                          key={move.move.name}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full capitalize"
                        >
                          {move.move.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
