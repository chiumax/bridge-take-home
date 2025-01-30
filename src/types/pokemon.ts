export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  imageUrl: string;
  stats: Stat[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  moves: {
    move: {
      name: string;
    };
  }[];
}

interface Stat {
  base_stat: number;
  name: string;
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

export interface PaginatedPokemonResponse {
  pokemon: PokemonDetails[];
  totalPages: number;
}

export interface PokemonListProps {
  initialData?: {
    pokemon: Pokemon[];
    totalPages: number;
  };
}
