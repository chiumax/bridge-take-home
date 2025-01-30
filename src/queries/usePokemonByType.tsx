import { useQuery } from "@tanstack/react-query";
import { PaginatedPokemonResponse } from "@/types/pokemon";
import { transformPokemonResponse } from "@/util/transformPokemonResponse";

export const getPokemonByType = async (
  type: string,
  page: number = 1
): Promise<PaginatedPokemonResponse | null> => {
  if (!type) return null;

  try {
    // First fetch all pokemon of this type
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${type.toLowerCase()}`
    );
    const data = await response.json();

    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = Math.ceil(data.pokemon.length / pageSize);

    // Then fetch details for each pokemon on current page
    const pokemonDetails = await Promise.all(
      data.pokemon
        .slice(startIndex, endIndex)
        .map(async (p: { pokemon: { url: string } }) => {
          const res = await fetch(p.pokemon.url);
          const details = await res.json();
          return transformPokemonResponse(details);
        })
    );

    return {
      pokemon: pokemonDetails,
      totalPages,
    };
  } catch (err) {
    console.error("Failed to fetch Pokemon by type:", err);
    return null;
  }
};

export function usePokemonByType(type: string, page: number = 1) {
  return useQuery<PaginatedPokemonResponse | null>({
    queryKey: ["pokemon-by-type", type, page],
    queryFn: async () => getPokemonByType(type, page),
    enabled: !!type,
    initialData: null,
  });
}
