<?php
namespace App\Models;

class Board
{
    private $board;


    public function __construct()
    {
        $board = [];
        //creer le board vide
        for ($i = 1; $i <=8 ; $i++) {
            for ($j = 1; $j <= 8; $j++) {
                $board[$i.'/'.$j] = null;
            }
        }
        //creer les pions
        for ($i=1; $i <= 8; $i++) {
            $board['2/'. $i] = new Pawn();
            $board['7/'.$i] = new Pawn();
        }

        //creer les autres pieces
        for ($i = 1; $i < 9 ; $i += 7) {
            $board[$i.'/1'] = new Rook();
            $board[$i.'/2'] = new Knight();
            $board[$i.'/3'] = new Bishop();
            $board[$i.'/4'] = new Queen();
            $board[$i.'/5'] = new King();
            $board[$i.'/6'] = new Bishop();
            $board[$i.'/7'] = new Knight();
            $board[$i.'/8'] = new Rook();
        }

        //assigne les couleurs et positions;
        for ($i = 1; $i<= 2; $i++) {
            for ($j = 1 ; $j <= 8 ; $j++) {
                $board[$i.'/'.$j]->setColor('white')->setPosX($j)->setPosY($i);
            }
        }

        for ($i = 7; $i<= 8; $i++) {
            for ($j = 1 ; $j <= 8 ; $j++) {
                $board[$i.'/'.$j]->setColor('black')->setPosX($j)->setPosY($i);
            }
        }
        $this->board = $board;
    }


    public function movePiece(Piece $piece, string $newPos)
    {
        $arrayPos = explode('/', $newPos);
        $newPosY = intval($arrayPos[0]);
        $newPosX = intval($arrayPos[1]);

        $this->board[$piece->getPosY().'/'. $piece->getPosX()] = null;
        $piece->setPosX($newPosX)->setPosY($newPosY);
        $this->board[$newPosY.'/'.$newPosX] = $piece;
    }

    
    
    public function hasPieceOnCase(int $posX, int $posY) : bool
    {
        if ($this->board[$posY.'/'.$posX] instanceof Piece) {
            return true;
        }
        return false;
    }

   
    public function hasAllyPieceOnCase(int $posX, int $posY, string $color) : bool
    {
        if ($this->board[$posY.'/'.$posX] instanceof Piece) {
            if ($color === $this->board[$posY.'/'.$posX]->getColor()) {
                return true;
            }
        }
        return false;
    }
    

    public function getBoard()
    {
        return $this->board;
    }

    public function getPiece(string $pos)
    {
        return $this->board[$pos];
    }
}
