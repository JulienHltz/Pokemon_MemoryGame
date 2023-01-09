<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GameTypeController extends AbstractController
{
    #[Route('/game/type', name: 'app_game_type')]
    public function index(): Response
    {
        return $this->render('game_type/index.html.twig', [
            'controller_name' => 'GameTypeController',
        ]);
    }
}
