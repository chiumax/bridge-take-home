import { useQuery } from "@tanstack/react-query";
import { PokemonDetails } from "@/types/pokemon";
import { transformPokemonResponse } from "@/util/transformPokemonResponse";
import { toast } from "react-toastify";

export const getPokemonByName = async (
  name: string
): Promise<PokemonDetails | null> => {
  if (!name) return null;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const data = await response.json();
    return transformPokemonResponse(data);
  } catch (err) {
    console.error("Failed to fetch Pokemon:", err);
    toast.error("Failed to fetch Pokemon");
    return null;
  }
};

export function usePokemonByName(name: string) {
  return useQuery<PokemonDetails | null>({
    queryKey: ["pokemon", name],
    queryFn: async () => getPokemonByName(name),
    enabled: !!name,
    initialData: null,
  });
}
