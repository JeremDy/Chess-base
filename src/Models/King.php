<?php

namespace App\Models;


class King extends Piece
{

    public function canDoThisMove($board, $newPosX, $newPosY)
    {
        //mouvement non null
        if (false === hasMoved()) {
            return false;
        }
        
        //deplacement d'une seul casse;
        $difX = abs($this->$posX - $newPosX);
        $difY = abs($this->$posY - $newPosY);
        
        if($difX !== 1 && $difY !== 1){
            return false;
        } 
        //pas d'allié sur la case d'arrivé;  
    }
    
}