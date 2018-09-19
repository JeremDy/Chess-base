<?php

namespace App\Models;

class Knight extends Piece
{
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
        
        if(abs($this->posY - $newPosY) === 2 && abs($this->posX - $newPosX) === 1){
            return true;
        }
        if(abs($this->posX - $newPosX) === 2 && abs($this->posY - $newPosY) === 1){
            return true;
        }
        
        return false;
    }

}
