<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameGenerationController extends AbstractController
{
    #[Route('/game/generation', name: 'app_game_generation')]
    public function index(): Response
    {
        return $this->render('game_generation/index.html.twig', [
            'controller_name' => 'GameGenerationController',
        ]);
    }
}
