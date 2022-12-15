<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameMemoryController extends AbstractController
{
    #[Route('/game/memory', name: 'app_game_memory')]
    public function index(): Response
    {

        $pokeImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';


        return $this->render('game_memory/index.html.twig', [
            'controller_name' => 'GameMemoryController',
            'poke_img' => $pokeImage,
        ]);
    }
    
}
