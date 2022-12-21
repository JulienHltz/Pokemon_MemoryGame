<?php

namespace App\Controller;

use App\Entity\Pokemon;
use App\Repository\PokemonRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class GameMemoryController extends AbstractController
{
    /**
     * @Route("/game/memory", name="app_game_memory")
     */
    public function index(PokemonRepository $pokemonRepository): Response
    {
        $pokemons = $this->getPokemons($pokemonRepository);

        return $this->render('game_memory/index.html.twig', [
            'controller_name' => 'GameMemoryController',
            'pokemons' => $pokemons,
        ]);
    }

    private function getPokemons(PokemonRepository $pokemonRepository): array
    {

        // Creating an empty array to put the pokemons
        $pokemons =[];

        // Generate randomly 12 numbers between 1 and 897
        $ids = array_rand(range(1, 897), 12);

        // Catch the corresponding pokemons to these numbers
        foreach ($ids as $id) {
            $pokemon = $pokemonRepository->findOneById($id);
            // dd($pokemon);
            // $pokemon = $pokemonRepository->findOneByImage($id);
            $pokemons[] = $pokemon;
            $pokemons[] = $pokemon;
        }

        shuffle($pokemons);
        // var_dump($pokemons);
        return $pokemons;

        
    }
}
