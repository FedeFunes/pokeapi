import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import ListLayout from './ListLayout.jsx';
import Detail from './Detail.jsx';

const POKE_URL = 'https://pokeapi.co/api/v2/pokemon';
const SPRITE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
const NUMBER_ITEMS_PER_PAGE = 5;
const Language = {
    spanish: { CODE: 'es', DESC: 'Spanish' },
    english: { CODE: 'en', DESC: 'English' },
    french: { CODE: 'fr', DESC: 'French' },
    italian: { CODE: 'it', DESC: 'Italian' },
    japanese: { CODE: 'ja', DESC: 'Japanese' },
    korean: { CODE: 'ko', DESC: 'Korean' }
};

function fetchJSON(params) {

}

/**
 * Obtiene lista de pokemons
 */
async function getPokemons() {

    // Llamo a la API una primera vez para usar la prop count (total de pokemons)
    const count = await fetch(POKE_URL)
        .then(r => r.json())
        .then(r => r.count);

    // Llamo a la API una segunda vez para obtener ahora la lista completa de pokemons con limit=count 
    let pokemons = await fetch(`${POKE_URL}?limit=${count}`)
        .then(r => r.json())
        .then(r => r.results);

    return pokemons;
}

/**
 * Obtiene un pokemon en particular
 * @param {string} name Nombre del pokemon
 * @param {string} language Idioma
 */
async function getPokemon(name, language) {

    let rPokemon = {};
    const pokemon = await fetch(POKE_URL + '/' + name)
        .then(r => r.json())
        .then(r => r);

    rPokemon.name = pokemon.name;
    rPokemon.abilities = await getAbilities(pokemon, language);
    rPokemon.images = getImageURL(pokemon);

    return rPokemon;
}

/**
 * Obtiene las URL de la imagenes del pokemon
 * @param {string} pokemon Nombre del pokemon 
 */
function getImageURL(pokemon) {
    return Object.keys(pokemon.sprites).filter(k => pokemon.sprites[k] !== null).map(k => pokemon.sprites[k]);
}

/**
 * Obtiene las habilidades del pokemon en el idioma deseado
 * @param {string} pokemon Nombre del pokemon 
 * @param {string} language Idioma 
 */
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

/**
 * Agregra informacion extra al pokemon: Id y Sprites
 * @param {Array<object>} pokemons Lista de pokemons 
 */
function addExtraInfo(pokemons) {
    pokemons.forEach(e => {
        const id = getPokemonIdFromURL(e.url);
        e.id = getPokemonIdFromURL(e.url);
        e.sprites = {
            frontDefault: `${SPRITE_URL}/${id}.png`
        };
    })
}

/**
 * Obtiene la cantidad de pags que va tener el paginado 
 * @param {number} count Cantidad de elementos 
 */
function getNumberPages(count) {
    return Math.ceil(count / NUMBER_ITEMS_PER_PAGE);
}

/**
 * Obtiene los elementos de una determinada pag
 * @param {Array<object>} pokemons Lista de pokemons
 * @param {number} pageNumber Nro de pag
 */
function getItemsPerPage(pokemons, pageNumber) {
    let items = pokemons.slice((pageNumber - 1) * NUMBER_ITEMS_PER_PAGE, pageNumber * NUMBER_ITEMS_PER_PAGE);
    addExtraInfo(items);
    return items;
}

/**
 * Obtiene el id del pokemon de la URL
 * @param {*} url URL
 */
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

    useEffect(() => {
        // Obtengo lista de pokemons
        getPokemons().then(pokemons => {
            setList(pokemons);
            setCount(pokemons.length);
            setNumberPages(getNumberPages(pokemons.length));
        });
    }, []);

    useEffect(() => {
        // Actualizo lista de elementos visibles
        setCurrentItems(getItemsPerPage(list, currentPage));
    }, [currentPage, list]);

    const _props = {
        currentPage,
        setCurrentPage,
        numberPages,
        count,
        currentItems,
        selectedItems,
        setSelectedItems,
        selectedItem,
        setSelectedItem,
        getPokemon,
        languages: Language
    };

    return (
        <>
            {/* Lista de pokemons */}
            <Route exact path="/" children={<ListLayout {..._props} />} />
            {/* Detalle del pokemon */}
            <Route path="/pokemon/:name" children={<Detail {..._props} />} />
        </>
    );
}