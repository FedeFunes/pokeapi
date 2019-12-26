import React, { useEffect, useState } from 'react';
import Main from './Main.jsx';

const NUMBER_ITEMS_PER_PAGE = 5;

async function getPokemons() {
    const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';

    const count = await fetch(POKE_URL)
        .then(r => r.json())
        .then(r => r.count);

    let pokemons = await fetch(`${POKE_URL}?limit=${count}`)
        .then(r => r.json())
        .then(r => r.results);

    return pokemons;
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

export default function () {

    const [list, setList] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(null);
    const [numberPages, setNumberPages] = useState(1);

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
        updateItemPerPage
    };

    return (
        <>
            <Main list={currentItems} {..._props} />
        </>
    );
}