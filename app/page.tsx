"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { usePokemons } from "@/lib/api/queries";
import Search from "./components/search";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { IPokemon } from "@/models/apis";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/utils";

const Pokemon = dynamic(() => import("./components/pokemon"), {
  ssr: false,
});

export default function Home() {
  const [search, setSearch] = React.useState("");
  const { ref, inView } = useInView();
  const debouncedSearch = useDebounce(search, 1000);

  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemons();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <main className="flex min-h-screen flex-col items-center px-5 md:p-24">
      <div className="md:w-10/12 flex justify-between gap-3 w-full py-10">
        <div>
          <Input
            placeholder="Find pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Link href="/my-pokemon" passHref>
          <Button
            variant="outline"
            className="bg-transparent hover:text-primary"
          >
            My Pokemon
          </Button>
        </Link>
      </div>
      {debouncedSearch ? (
        <Search search={debouncedSearch} />
      ) : (
        <div className="w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4">
          {pokemons?.pages?.map((page) =>
            page.map((pokemon: IPokemon, index: number) => {
              const url = imageUrl(pokemon.url);
              if (page.length === index + 1) {
                return (
                  <Pokemon
                    image={url}
                    name={pokemon.name}
                    key={index}
                    innerRef={ref}
                  />
                );
              } else {
                return <Pokemon image={url} name={pokemon.name} key={index} />;
              }
            })
          )}
          {isFetchingNextPage && <p>wait...</p>}
        </div>
      )}
    </main>
  );
}
