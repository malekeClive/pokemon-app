import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { usePokemon } from "@/lib/api/queries";
import { cn } from "@/lib/utils";
import { IType, ITypeName } from "@/models/apis";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PokemonProps {
  name: string;
  image: string;
  typeFilter?: ITypeName;
  innerRef?: (node?: Element | null | undefined) => void;
}

function Pokemon({ name, image, typeFilter, innerRef }: PokemonProps) {
  let matched = false;
  const { data } = usePokemon(name);

  if (typeFilter) {
    data?.types?.forEach((type: IType) => {
      if (type.type.name === typeFilter) {
        matched = true;
      }
    });
  }

  return (
    <Link
      href={`pokemon/${name}`}
      ref={innerRef}
      className={cn(typeFilter ? (matched ? "visible" : "hidden") : "")}
    >
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <Image alt={name} src={image} width={64} height={64} />
            <p className="capitalize text-sm">{name}</p>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default Pokemon;
