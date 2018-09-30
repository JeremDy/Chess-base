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
    public function index(Game $game = null)
    {
        if (!$game || ($this->getUser() !== $game->getPlayerOne() && $this->getUser() !== $game->getPlayerTwo())){
            return $this->redirectToRoute('home');
        }
        $color = $game->getPlayerOne()->getUsername() === $this->getUser()->getUsername() ? 1 : 0;

        $opponent = $this->getUser() === $game->getPlayerOne() ? $game->getPlayerTwo() : $game->getPlayerOne();
       
        return $this->render('game/index.html.twig',[
            'game' => $game,
            'color' => $color,
            'opponent' => $opponent,
        ]);
    }
}
