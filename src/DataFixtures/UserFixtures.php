<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Game;
use App\Entity\GameUser;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Table User

        $user1 = new User();
        $password = $this->hasher->hashPassword($user1, 'Mdp28469!');
        $user1->setPassword($password);
        $user1->setEmail("47stilldreaming@gmail.com");
        $user1->setPseudo("julien_47160");
        $user1->setRoles(["ROLE_ADMIN"]);
        $manager->persist($user1);
        $manager->flush();

        $user2 = new User();
        $password = $this->hasher->hashPassword($user2, '123456');
        $user2->setPassword($password);
        $user2->setEmail("gtn.langlet@gmail.com");
        $user2->setPseudo("Neo");
        $user2->setRoles(["ROLE_ADMIN"]);
        $manager->persist($user2);
        $manager->flush();

        $user3 = new User();
        $password = $this->hasher->hashPassword($user3, 'Mdp28469!');
        $user3->setPassword($password);
        $user3->setEmail("test@test.com");
        $user3->setPseudo("test");
        $user3->setRoles([]);
        $manager->persist($user3);
        $manager->flush();

        $user4 = new User();
        $password = $this->hasher->hashPassword($user4, 'Mdp28469!');
        $user4->setPassword($password);
        $user4->setEmail("test2@test.com");
        $user4->setPseudo("test2");
        $user4->setRoles([]);
        $manager->persist($user4);
        $manager->flush();

        // Table Game

        $game = new Game();
        $game2 = new Game();
        $game3 = new Game();
        $game->setName("Memory");
        $manager->persist($game); 
        $manager->flush();

        $game2->setName("Type");
        $manager->persist($game2);
        $manager->flush();

        $game3->setName("Generation");
        $manager->persist($game3);
        $manager->flush();

        $userGame = new GameUser;
        $userGame->setUser($user1);
        $userGame->setGame($game);
        $userGame->setScore(700);
        $manager->persist($userGame);
        $manager->flush();

        $userGame = new GameUser;
        $userGame->setUser($user2);
        $userGame->setGame($game);
        $userGame->setScore(550);
        $manager->persist($userGame);
        $manager->flush();

        $userGame = new GameUser;
        $userGame->setUser($user3);
        $userGame->setGame($game);
        $userGame->setScore(600);
        $manager->persist($userGame);
        $manager->flush();

        $userGame = new GameUser;
        $userGame->setUser($user4);
        $userGame->setGame($game);
        $userGame->setScore(300);
        $manager->persist($userGame);
        $manager->flush();
        
    }
}
