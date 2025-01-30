"use client";

import { useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import { usePokemonList } from "@/queries/usePokemonList";

export default function PokemonList({
  filterType,
}: {
  filterType: string | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError } = usePokemonList(
    currentPage,
    limit,
    filterType
  );

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const { pokemon, totalPages } = data;

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemon.map((p) => (
          <PokemonCard pokemon={p} key={p.id} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
