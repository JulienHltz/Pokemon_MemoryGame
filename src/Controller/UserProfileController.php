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

                // ************  TYPE PART ******************

                // Create an array to store the types of this Pokemon
                $types = [];

                foreach ($pokemon->apiTypes as $type) {
                    $types[] = $type->name;
                }
                // Convert the array of types into a comma-separated string
                $types = implode(', ', $types);

                // ************ TYPE PART - END ******************


                $img_default = $pokemon->image;
                $generation = $pokemon->apiGeneration;


                // Insert pokemons data in table pokemon
                $query = "INSERT INTO pokemon (api_id, name, image, generation) VALUES ('$pokedexid', '$name', '$img_default', '$generation')";


                // Insert pokemon_id and corresponding types of each pokemon in table pokemon_type
                $query2 = "INSERT INTO pokemon_type (pokemon_id, type) VALUES ('$pokedexid','$types')";


                // echo '<pre>';
                // var_dump($query2);
                // echo '</pre>';
                // die();


            }
        }

        // ************  THIS PART IS TO GET ALL TYPES FOR THE TABLE TYPES ******************

            // Send a GET request to the specified URL
        $response2 = $this->client->request('GET', 'https://pokebuildapi.fr/api/v1/types');
            // Check the response
        if ($response2->getStatusCode() == 200) {
            // Request was successful
            $dataType = json_decode($response2->getContent());

            foreach ($dataType as $typeResult) {
                $typeName = $typeResult->name;
                
                // Insert all types of pokemon into table type
                $query3 = "INSERT INTO type (type) VALUES ('$typeName')";
                
                echo '<pre>';
                var_dump($query3);
                echo '</pre>';
            }
        }
    }
}
