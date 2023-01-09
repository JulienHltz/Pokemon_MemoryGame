<?php

namespace App\Controller;

use App\Entity\Pokemon;
use App\Entity\Type;
use App\Repository\PokemonRepository;
use App\Repository\TypeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;



class PokemonController extends AbstractController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    #[Route('/pokemon', name: 'app_pokemon')]
    public function index(): Response
    {
        return $this->render('pokemon/index.html.twig', [
            'controller_name' => 'PokemonController',
        ]);
    }

    #[Route('/save', name: 'app_save_pokemon')]
    public function savePokemons(PokemonRepository $pokemonRepository, TypeRepository $typeRepository)
    {

        // Send a GET request to the specified URL
        $responseType = $this->client->request('GET', 'https://pokebuildapi.fr/api/v1/types');
        $response = $this->client->request('GET', 'https://pokebuildapi.fr/api/v1/pokemon');
        // Check the response
        if($responseType->getStatusCode() ==200){
            $types = json_decode($responseType->getContent());
            foreach ($types as $type){
                $tp = $typeRepository->findOneBy((['type' => $type->name]));
                if(!$tp){
                    $poketype = new Type();
                    $poketype->setType($type->name);
                    $typeRepository->save($poketype, true);
                }
            }
        }
        if ($response->getStatusCode() == 200) {
            // Request was successful
            $pokemons = json_decode($response->getContent());





            foreach ($pokemons as $pokemon) {
                $pk = $pokemonRepository->findOneBy(['api_id' => $pokemon->pokedexId]);
                if(!$pk){
                    $pk = new Pokemon();
                    $pk->setApiId($pokemon->pokedexId)
                        ->setName($pokemon->name)
                        ->setImage($pokemon->image)
                        ->setGeneration($pokemon->apiGeneration);
                    }
                    
                foreach ($pokemon->apiTypes as $type) {
                    $pktype = $typeRepository->findOneBy(['type' => $type->name]);
                                        
                    if($pktype){
                        // $id = intval($pktype->getId());
                        $pk->addType($pktype);
                    }}
                $pokemonRepository->save($pk, true);
            }
        }

        return $this->redirectToRoute('app_user_profile');
    }
}
