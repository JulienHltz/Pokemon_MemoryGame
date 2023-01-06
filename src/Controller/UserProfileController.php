<?php

namespace App\Controller;

use App\Entity\GameUser;
use App\Repository\GameRepository;
use App\Repository\GameUserRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserProfileController extends AbstractController
{
    

    #[Route('/user/profile', name: 'app_user_profile')]
    public function index(UserInterface $user, UserRepository $userRepository,GameUserRepository $gameUserRepository): Response
    {
        $player = $userRepository->findOneBy(["email" => $user->getUserIdentifier()]);
        $newScore = new GameUser();
        $scoreTable = $gameUserRepository->findBy(['user' => $player->getId()]);
        return $this->render('user_profile/index.html.twig', [
            'controller_name' => 'UserProfileController',
            'scoreTable' => $scoreTable
        ]);
    }
}
