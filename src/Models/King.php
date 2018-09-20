<?php

namespace App\Models;

class King extends Piece
{
    public function canDoThisMove(Board $board, int $newPosX, int $newPosY) : bool
    {
        //la nouvelle case existe :
        if (false === $board->newPosExist($newPosX, $newPosY)) {
            return false;
        }
        //mouvement non null
        if (false === $this->hasMoved($newPosX, $newPosY)) {
            return false;
        }
        if (true === $board->hasAllyPieceOnCase($newPosX, $newPosY, $this->getColor())) {
            return false;
        }
        if ( false === $this->oneCaseMove($newPosX, $newPosY)){
            return false;
        }
        
        //deplacement d'une seul casse;
      
        return true;
    }

    public function oneCaseMove(int $newPosX, int $newPosY) : bool
    {
        if($this->posX === $newPosX && abs($this->posY - $newPosY) === 1){
            return true;
        }
        if($this->posY === $newPosY && abs($this->posX - $newPosX) === 1){
            return true;
        }
        if(abs($newPosY - $this->posY) === 1 && abs($newPosX - $this->posX) === 1){
            return true;
        }
        return false;
    }
}