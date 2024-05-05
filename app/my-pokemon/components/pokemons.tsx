import Pokemon from "@/app/components/pokemon";
import { imageUrlById } from "@/lib/utils";
import localStorageUtils from "@/localstorage/manage";
import { IPokemonDetail } from "@/models/apis";

export default function Pokemons() {
  const myPokemons = localStorageUtils.getItem<IPokemonDetail[]>("my_pokemon");

  return (
    <>
      {myPokemons && myPokemons?.length > 0 ? (
        <div className="px-5">
          {myPokemons?.map((pokemon, id) => {
            const url = imageUrlById(pokemon.id.toString());

            return <Pokemon key={id} image={url} name={pokemon.name} />;
          })}
        </div>
      ) : (
        <div className="px-5">No pokemon yet</div>
      )}
    </>
  );
}
