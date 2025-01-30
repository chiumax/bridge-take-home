import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";

export const getPokemonList = async (
  currentPage: number,
  limit: number
): Promise<{ pokemon: Pokemon[]; totalPages: number }> => {
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
      return {
        id: details.id,
        name: details.name,
        imageUrl: details.sprites.other["official-artwork"].front_default,
        types: details.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
      };
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
  options?: UseQueryOptions
) {
  return useQuery({
    queryKey: ["pokemon", currentPage],
    queryFn: async () => getPokemonList(currentPage, limit),
    ...options,
  });
}
