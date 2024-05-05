import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Type from "@/components/ui/type";
import { IPokemonDetail } from "@/models/apis";
import service from "@/services/service";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";

const Catch = dynamic(() => import("./components/catch-button"), {
  ssr: false,
});

export default async function Detail({
  params: { name },
}: {
  params: { name: string };
}) {
  const pokemon = (await service.getPokemon(name)) as IPokemonDetail;

  return (
    <section className="max-w-2xl h-screen mx-auto px-5 xl:px-0">
      <div className="py-10">
        <Link href="/" passHref>
          <Button variant="link" className="flex items-center gap-2 text-white">
            <ChevronLeft size={18} />
            <span>Back</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-center justify-center ">
        <div>
          <Image
            alt={pokemon.name}
            src={pokemon.sprites.other.home.front_default}
            width={264}
            height={264}
          />
        </div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Image
                alt={pokemon.name}
                src={pokemon.sprites.front_default}
                width={64}
                height={64}
              />
              <p>{pokemon.name}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2">
              <p>height</p>
              <p>{pokemon.height}&apos;</p>
              <p>weight</p>
              <p>{pokemon.weight} lbs.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              {pokemon.stats.map((stat, index) => (
                <div className="grid grid-cols-2" key={index}>
                  <p>{stat.stat.name}</p>
                  <p>{stat.base_stat}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 w-full">
              <p>type</p>
              <div className="flex flex-wrap gap-1">
                {pokemon.types.map((type, index) => (
                  <Type key={index} name={type.type.name} />
                ))}
              </div>
            </div>
            <Catch pokemon={pokemon} />
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
