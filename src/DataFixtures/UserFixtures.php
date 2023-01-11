<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Game;
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

        $user = new User();
        $password = $this->hasher->hashPassword($user, 'Mdp28469!');
        $user->setPassword($password);
        $user->setEmail("47stilldreaming@gmail.com");
        $user->setPseudo("julien_47160");
        $user->setRoles(["ROLE_ADMIN"]);
        $manager->persist($user);
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
        
    }
}
