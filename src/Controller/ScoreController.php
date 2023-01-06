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
    #[Route('/score/{mod}/{score}', name: 'app_score', methods: 'POST')] // ,role user à rajouter
    public function index($mod, $playerId, $score, GameUserRepository $gameUserRepository, GameRepository $gameRepository, UserRepository $userRepository,UserInterface $user)
    {
        $game = $gameRepository->findOneBy(["id" => $mod]);
        $player = $userRepository->findOneBy(["email" => $user->getUserIdentifier()]);
        $newScore = new GameUser();
        $scoreTable = $gameUserRepository->findOneBy(['user' => $playerId, 'game' => $mod]);

        if (!$scoreTable) {
            $newScore->setGame($game)
                ->setUser($user)
                ->setScore($score);
            $gameUserRepository->save($newScore, true);
            return new Response(null, Response::HTTP_NO_CONTENT);
        } elseif ($score > $scoreTable->getScore()) {
            $gameUserRepository->remove($scoreTable, true);
            $newScore->setGame($game)
                ->setUser($player)
                ->setScore($score);
            $gameUserRepository->save($newScore, true);
            return new Response(null, Response::HTTP_NO_CONTENT);
        }

        return new Response(null, Response::HTTP_BAD_REQUEST);
    }
}
