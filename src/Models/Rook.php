<?php

namespace App\Models;

class Rook extends Piece
{
    public function canDoThisMove(Board $board, $newPosX, $newPosY)
    {
    //mouvement non null?
        if(false === hasMoved()){
            return false;
        }
    //mouvement vertical ou mouvement horizontal? pas de pieces entre le depart et l'arrivé?
        if (false === isValideVerticalMovement() && false ===  isValideHorizontalMovement()){
            return false;
        }
          //pas de piece allié à l'arrivé
    }


   
}