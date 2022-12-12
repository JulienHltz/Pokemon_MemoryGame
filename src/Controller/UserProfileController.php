<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class UserProfileController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    #[Route('/user/profile', name: 'app_user_profile')]
    public function index(): Response
    {
        return $this->render('user_profile/index.html.twig', [
            'controller_name' => 'UserProfileController'
        ]);
    }

    #[Route('/user/savepokemon', name: 'app_save_pokemon')]
    public function savePokemons()
    {

        // Send a GET request to the specified URL
        $response = $this->client->request('GET', 'https://pokebuildapi.fr/api/v1/pokemon');

        // Check the response
        if ($response->getStatusCode() == 200) {
            // Request was successful
            $pokemons = json_decode($response->getContent());


           
            
            foreach ($pokemons as $pokemon) {
                $pokedexid = $pokemon->pokedexId;
                $name = $pokemon->name;
                // $type = $pokemon->apiTypes[1]->name; A REUTILISER DANS LA PARTIE TYPE
                $img_default = $pokemon->image;
                $generation = $pokemon->apiGeneration;
              
                
                // Insert pokemons data in db
                $query = "INSERT INTO pokemon (api_id, name, image, generation) VALUES ('$pokedexid', '$name', '$img_default', '$generation')";



                echo '<pre>';
                var_dump($query);
                echo '</pre>';
                // die();
                
            }
        }
    }
}
