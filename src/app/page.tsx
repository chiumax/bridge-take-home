"use client";

import PokemonList from "@/components/PokemonList";
import SearchBar from "@/components/SearchBar";
import { usePokemonByName } from "@/queries/usePokemonByName";
import { useState } from "react";
import PokemonDetailsCard from "@/components/PokemonDetailsCard";
import FilterSelect from "@/components/FilterSelect";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const { data: searchedPokemon } = usePokemonByName(searchTerm);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = (type: string | null) => {
    setFilterType(type);
  };

  return (
    <main
      className="min-h-screen p-8 max-w-7xl mx-auto"
      // style={{
      //   backgroundImage:
      //     'url("https://i.ibb.co/MxcZ7GYT/stylish-hexagonal-line-pattern-background-1017-19742.jpg")',
      //   backgroundRepeat: "repeat",
      //   backgroundSize: "auto",
      // }}
    >
      <div className="flex justify-center mb-8">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokemon Logo"
          width={300}
          height={110}
          priority
        />
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
        <SearchBar onSubmit={handleSearch} />
        <FilterSelect onSelect={handleFilter} />
      </div>

      <PokemonList filterType={filterType} />

      {searchedPokemon && (
        <PokemonDetailsCard
          pokemon={searchedPokemon}
          onExitComplete={() => setSearchTerm("")}
        />
      )}
      <ToastContainer />
    </main>
  );
}
