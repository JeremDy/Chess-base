<?php

namespace App\Models;


class King extends Piece
{

    public function canDoThisMove(Board $board, int $newPosX, int $newPosY)
    {
        //la nouvelle case existe :
        if (false === $board->newPosExist($newPosX, $newPosY)) {
            return false;
        }
        //mouvement non null
        if (false === $this->hasMoved($newPosX,$newPosY)) {
            return false;
        }
        if (true === $board->hasAllyPieceOnCase($newPosX, $newPosY, $this->getColor())) {
            return false;
        }
        
        //deplacement d'une seul casse;
        $difX = abs($this->$posX - $newPosX);
        $difY = abs($this->$posY - $newPosY);
        
        if($difX !== 1 && $difY !== 1){
            return false;
        } 
    }
    
}