<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Game;
    

class GameController extends AbstractController
{
    /**
     * @Route("/game/{id}", name="game")
     */
    public function index(Game $game)
    {
        $color = $game->getPlayerOne()->getUsername() === $this->getUser()->getUsername() ? 1 : 0;
       
        return $this->render('game/index.html.twig',[
            'game' => $game,
            'color' => $color
        ]);
    }
}
