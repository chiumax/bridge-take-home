export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonListProps {
  initialData?: {
    pokemon: Pokemon[];
    totalPages: number;
  };
}
