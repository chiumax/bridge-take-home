import { useQuery } from "@tanstack/react-query";
import { PokemonListResponse, PaginatedPokemonResponse } from "@/types/pokemon";
import { transformPokemonResponse } from "@/util/transformPokemonResponse";
import { getPokemonByType } from "./usePokemonByType";

export const getPokemonList = async (
  currentPage: number,
  limit: number,
  filterType: string | null
): Promise<PaginatedPokemonResponse | null> => {
  if (filterType) {
    return getPokemonByType(filterType, currentPage);
  }

  const offset = (currentPage - 1) * limit;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const data: PokemonListResponse = await response.json();
  const totalPages = Math.ceil(data.count / limit);

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return transformPokemonResponse(details);
    })
  );

  return {
    pokemon: pokemonDetails,
    totalPages,
  };
};

export function usePokemonList(
  currentPage: number,
  limit: number,
  filterType: string | null
) {
  return useQuery<PaginatedPokemonResponse | null>({
    queryKey: ["pokemon", currentPage, filterType],
    queryFn: async () => getPokemonList(currentPage, limit, filterType),
    initialData: null,
  });
}
