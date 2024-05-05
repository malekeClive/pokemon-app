"use client";

import { Button } from "@/components/ui/button";
import localStorageUtils from "@/localstorage/manage";
import { IPokemonDetail } from "@/models/apis";
import React from "react";
import { toast } from "sonner";

export default function Catch({ pokemon }: { pokemon: IPokemonDetail }) {
  const [isCatched, setIsCatched] = React.useState(false);

  React.useEffect(() => {
    const catched = localStorageUtils.findInArray<IPokemonDetail>(
      "my_pokemon",
      (poke) => Number(poke.id) === pokemon.id
    );

    if (catched) {
      setIsCatched(true);
    }
  }, [pokemon]);

  const onCatch = (pokemon: IPokemonDetail) => {
    const isCatched = Math.random() < 0.5;

    if (isCatched) {
      if (window.localStorage.getItem("my_pokemon")) {
        localStorageUtils.appendToArray("my_pokemon", pokemon);
        setIsCatched(true);
      } else {
        localStorageUtils.setItem("my_pokemon", [pokemon]);
        setIsCatched(true);
      }

      toast.success("Catched!");
      return;
    }

    toast.error("Failed to catch!");
  };

  return (
    <Button disabled={isCatched} onClick={() => onCatch(pokemon)}>
      {isCatched ? "Catched" : "Catch"}
    </Button>
  );
}
