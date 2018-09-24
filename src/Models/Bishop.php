<?php

namespace App\Models;

class Bishop extends Piece
{

    protected $code = 'F';
    
    public function canDoThisMove(Board $board, int $newPosX, int $newPosY) : bool
    {
        //la nouvelle case existe :
        if (false === $board->newPosExist($newPosX, $newPosY)) {
            return false;
        }
        //mouvement non null?
        if (false === $this->hasMoved($newPosX, $newPosY)) {
            return false;
        }
        //pas de piece allié à l'arrivé
        if (true === $board->hasAllyPieceOnCase($newPosX, $newPosY, $this->getColor())) {
            return false;
        }
        if (false ===  $this->isDoingValideDiagonalMovement($board, $newPosX, $newPosY)) {
            return false;
        }
        return true;
    }
}
