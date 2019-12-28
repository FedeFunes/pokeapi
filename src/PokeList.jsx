import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Detail from './Detail.jsx';

const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';
const SPRITE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
const NUMBER_ITEMS_PER_PAGE = 5;
const Language = {
    SPANISH: "es",
    ENGLISH: "en"
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

    let rPokemon = {};
    const pokemon = await fetch(POKE_URL + '/' + name)
        .then(r => r.json())
        .then(r => r);

    rPokemon.name = pokemon.name;
    rPokemon.abilities = await getAbilities(pokemon, Language.SPANISH);
    rPokemon.images = getImageURL(pokemon);

    return rPokemon;
}

function getImageURL(pokemon) {
    return Object.keys(pokemon.sprites).filter(k => pokemon.sprites[k] !== null).map(k => pokemon.sprites[k]);
}

async function getAbilities(pokemon, language) {

    let props = ['flavor_text_entries', 'names'];

    const abilities = await Promise.all(pokemon.abilities.map(e => {
        return fetch(e.ability.url).then(r => r.json());
    }));

    let _abilities = abilities.map(a => {

        let ability = {};

        props.forEach(p => {
            ability[p] = a[p].find(e => {
                return e.language.name === language;
            })
        })

        return ability;
    });

    return _abilities;
}

function addExtraInfo(pokemons) {
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

export default function () {

    const [list, setList] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(null);
    const [numberPages, setNumberPages] = useState(1);
    const [selectedItem, setSelectedItem] = useState({
        images: [],
        abilities: []
    });
    const [selectedItems, setSelectedItems] = useState([]);

    function updateItemPerPage() {
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
        currentItems,
        selectedItems,
        setSelectedItems,
        selectedItem,
        setSelectedItem,
        getPokemon
    };

    return (
        <>
            <Route exact path="/" children={<Layout {..._props} />} />
            <Route path="/pokemon/:name" children={<Detail {..._props} />} />
        </>
    );
}