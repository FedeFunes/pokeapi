import React, { useEffect, useState } from 'react';
import Main from './Main.jsx';
import { BrowserRouter, useParams, Switch, Route } from 'react-router-dom';

const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';
const NUMBER_ITEMS_PER_PAGE = 5;
const Language = {
    SPANISH: "es"
};

async function getPokemons() {

    const count = await fetch(POKE_URL)
        .then(r => r.json())
        .then(r => r.count);

    let pokemons = await fetch(`${POKE_URL}?limit=${count}`)
        .then(r => r.json())
        .then(r => r.results);

    return pokemons;
}

async function getPokemon(name) {

    let hola = {};
    const pokemon = await fetch(POKE_URL + '/' + name)
        .then(r => r.json())
        .then(r => r);

    console.log('POKEMON', pokemon);
    hola.pokemon = pokemon;
    hola.abilities = await getAbilities(pokemon, Language.SPANISH);
    hola.images = getImageURL(pokemon);
    console.log('HOLA', hola)

}

function getImageURL(pokemon) {
    return Object.keys(pokemon.sprites).filter( k => pokemon.sprites[k] !== null).map(k => pokemon.sprites[k]);
}

async function getAbilities(pokemon, language) {

    // let props = ['effect_changes', 'effect_entries', 'flavor_text_entries', 'names'];
    let props = ['flavor_text_entries', 'names'];

    const abilities = await Promise.all(pokemon.abilities.map(e => {
        return fetch(e.ability.url).then(r => r.json());
    }));

    let foo = abilities.map(a => {

        let ability = {};
        
        props.forEach(p => {
            ability[p] = a[p].find(e => {
                return e.language.name === language;
            })
        })

        return ability;
    });

    console.log(foo);
    return foo;
}

function addExtraInfo(pokemons) {

    const SPRITE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;

    pokemons.forEach(e => {
        const id = getPokemonIdFromURL(e.url);
        e.id = getPokemonIdFromURL(e.url);
        e.sprites = {
            frontDefault: `${SPRITE_URL}/${id}.png`
        };
    })
}

function getNumberPages(count) {
    return Math.ceil(count / NUMBER_ITEMS_PER_PAGE);
}

function getItemsPerPage(pokemons, pageNumber) {
    let items = pokemons.slice((pageNumber - 1) * NUMBER_ITEMS_PER_PAGE, pageNumber * NUMBER_ITEMS_PER_PAGE);
    addExtraInfo(items);
    return items;
}

function getPokemonIdFromURL(url) {
    return url.match(/\/\d+\//g)[0].slice(1, -1)
}

function Pokemon(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  useEffect(() => {
    getPokemon(id);  
  }, [id]);

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default function () {

    const [list, setList] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(null);
    const [numberPages, setNumberPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    function updateItemPerPage () {
        setCurrentItems(getItemsPerPage(list, currentPage));
    }

    useEffect(() => {
        getPokemons().then(pokemons => {
            setList(pokemons);
            setCount(pokemons.length);
            setNumberPages(getNumberPages(pokemons.length));
        });
    }, []);

    useEffect(() => {
        setCurrentItems(getItemsPerPage(list, currentPage));
    }, [currentPage, list]);

    const _props = {
        currentPage,
        setCurrentPage,
        numberPages,
        count,
        updateItemPerPage,
        list: currentItems,
        selectedItems,
        setSelectedItems,
        selectedItem,
        setSelectedItem
    };

    return (
        <>
            <Main {..._props} />
            <Route path="/pokemon/:id" children={<Pokemon {..._props} />} />
        </>
    );
}