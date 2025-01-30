import { useQueries } from "@tanstack/react-query";

interface TypeRelation {
  name: string;
  url: string;
}

interface TypeRelations {
  double_damage_from: TypeRelation[];
  double_damage_to: TypeRelation[];
  half_damage_from: TypeRelation[];
  half_damage_to: TypeRelation[];
  no_damage_from: TypeRelation[];
  no_damage_to: TypeRelation[];
}

export const getPokemonWeaknessByType = async (
  type: string
): Promise<TypeRelations | null> => {
  if (!type) return null;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${type.toLowerCase()}`
    );
    const data = await response.json();
    return {
      double_damage_from: data.damage_relations.double_damage_from,
      double_damage_to: data.damage_relations.double_damage_to,
      half_damage_from: data.damage_relations.half_damage_from,
      half_damage_to: data.damage_relations.half_damage_to,
      no_damage_from: data.damage_relations.no_damage_from,
      no_damage_to: data.damage_relations.no_damage_to,
    };
  } catch (err) {
    console.error("Failed to fetch Pokemon type relations:", err);
    return null;
  }
};

export function usePokemonWeaknessByType(types: string[]) {
  const results = useQueries({
    queries: types.map((type) => ({
      queryKey: ["pokemon-weakness", type],
      queryFn: async () => getPokemonWeaknessByType(type),
      enabled: !!type,
      initialData: null,
    })),
  });

  return {
    data: results.map((q) => q.data),
    isLoading: results.some((q) => q.isLoading),
    isError: results.some((q) => q.isError),
    error: results.find((q) => q.error)?.error,
  };
}
