import { PokemonDetails } from "@/types/pokemon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformPokemonResponse = (data: any): PokemonDetails => {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((type: { type: { name: string } }) => type.type.name),
    imageUrl: data.sprites.front_default,
    stats: data.stats.map(
      (stat: { base_stat: number; stat: { name: string } }) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })
    ),
    abilities: data.abilities,
    sprites: data.sprites,
    moves: data.moves,
  };
};
