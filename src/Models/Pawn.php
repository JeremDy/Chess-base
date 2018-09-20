<?php
namespace App\Models;

class Pawn extends Piece
{
    public function canDoThisMove(Board $board, int $newPosX, int $newPosY) : bool
    {
        //la nouvelle case existe :
        if (false === $board->newPosExist($newPosX, $newPosY)) 
        {
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
        if (false === $this->pawnMovementDirection($newPosY)) {
            return false;
        }

        if (false === $this->pawnAttackMove($board, $newPosX, $newPosY)
        && false === $this->pawnRegularMove($board, $newPosX, $newPosY)
        && false === $this->pawnFirstMove($board, $newPosX, $newPosY)) {
            return false;
        }
        return true;
    }


    public function pawnAttackMove(Board $board, int $newPosX, int $newPosY) : bool
    {
       
        if (abs($this->posX - $newPosX) !== 1 || abs($this->posY - $newPosY) !== 1) {
            return false;
        }
        if (false === $board->hasEnemyPieceOnCase($newPosX, $newPosY, $this->getColor())) {
            return false;
        }
        return true;
    }

    public function pawnRegularMove(Board $board, int $newPosX, int $newPosY) : bool
    {
        if (abs($this->posY - $newPosY) !== 1 || $this->posX !== $newPosX) {
            return false;
        }
        if (true === $board->hasEnemyPieceOnCase($newPosX, $newPosY, $this->getColor())) {
            return false;
        }
        return true;
    }

    public function pawnMovementDirection(int $newPosY) : bool
    {
        $dirY = $this->posY < $newPosY ? 1 : -1;
        
        if ($dirY === -1 && $this->getColor() === 'white') {
            return false;
        }
        if ($dirY === 1 && $this->getColor() === 'black') {
            return false;
        }
        return true;
    }

    public function pawnFirstMove(Board $board, int $newPosX, int $newPosY) : bool
    {
        if (false === $this->isDoingValideVerticalMovement($board, $newPosX, $newPosY)) {
            return false;
        }  
        if ($this->getColor() === 'white' && $this->getPosY() === 2 && $newPosY === 4){
            return true;
        }
        if ($this->getColor() === 'black' && $this->getPosY() === 7 && $newPosY === 5){
            return true;
        }
        return false;
    }
}
