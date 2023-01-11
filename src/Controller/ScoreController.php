<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\GameUser;
use PhpParser\Builder\Method;
use App\Repository\GameRepository;
use App\Repository\UserRepository;
use App\Repository\GameUserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ScoreController extends AbstractController
{
    #[Route('/score/{mod}/{score}', name: 'app_score', methods: 'POST')]
    public function index($mod, $score, GameUserRepository $gameUserRepository, GameRepository $gameRepository)
    {
        $game = $gameRepository->findOneBy(["id" => $mod]); 
        $newScore = new GameUser();
        $user = $this->getUser();
        $scoreTable = $gameUserRepository->findOneBy(['user' => $user, 'game' => $mod]);

        if (!$scoreTable) {
            $newScore->setGame($game)
                ->setUser($this->getUser())
                ->setScore($score);
            $gameUserRepository->save($newScore, true);
            return new Response(null, Response::HTTP_NO_CONTENT);
        } elseif ($score > $scoreTable->getScore()) {
            $gameUserRepository->remove($scoreTable, true);
            $newScore->setGame($game)
                ->setUser($user)
                ->setScore($score);
            $gameUserRepository->save($newScore, true);
            return new Response(null, Response::HTTP_NO_CONTENT);
        }

        return new Response(null, Response::HTTP_BAD_REQUEST);
    }
}
