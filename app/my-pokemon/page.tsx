"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Pokemons = dynamic(() => import("./components/pokemons"), {
  ssr: false,
});

export default function MyPokemon() {
  return (
    <div className="md:w-10/12 mx-auto ">
      <div className="py-10">
        <Link href="/" passHref>
          <Button variant="link" className="flex items-center gap-2 text-white">
            <ChevronLeft size={18} />
            <span>Back</span>
          </Button>
        </Link>
      </div>
      <Pokemons />
    </div>
  );
}
