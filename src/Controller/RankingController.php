<?php

namespace App\Controller;
use App\Repository\GameUserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RankingController extends AbstractController
{
    #[Route('/ranking', name: 'app_ranking')]
    public function index(GameUserRepository $gameUserRepository): Response
    {
        $scores = $gameUserRepository->findBy(array(), array('score' => 'DESC', 'game' => 'ASC'));
        return $this->render('ranking/index.html.twig', [
            'controller_name' => 'RankingController',
            'results' => $scores
        ]);
    }
}