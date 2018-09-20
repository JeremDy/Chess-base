<?php

namespace App\Models;

class Piece
{
    protected $posX;
    protected $posY;
    protected $color;


   
    public function hasMoved(int $newPosX, int $newPosY) : bool
    {
        if ($this->posX === $newPosX && $this->posY === $newPosY) {
            dump('have not move');
            return false;
        }
        return true;
    }

    
    public function isDoingValideVerticalMovement(Board $board, int $newPosX, int $newPosY) : bool
    {
        if ($this->posX !== $newPosX) {
            dump('invalide vertical move 1');
            return false;
        }

        $dirY = $this->posY < $newPosY ? 1 : -1;
        $dif = abs($this->posY - $newPosY);
            
        for ($i = 1; $i < $dif; $i++) {
            if ($board->hasPieceOnCase($this->posX, $this->posY + $i * $dirY)) {
                dump('invalide vertical move 2');
                return false;
            }
        }
        return true;
    }
    
    public function isDoingValideHorizontalMovement(Board $board, int $newPosX, int $newPosY) : bool
    {
        if ($this->posY !== $newPosY) {
            dump('invalide horizontal move 1');
            return false;
        }
        $dirX = $this->posX < $newPosX ? 1 : -1;
        $dif = abs($this->posX - $newPosX);
            
        for ($i = 1; $i < $dif; $i++) {
            if ($board->hasPieceOnCase($this->posX + $i * $dirX, $this->posY)) {
                dump('invalide horizontal move 2');
                return false;
            }
        }
        return true;
    }

    public function isDoingValideDiagonalMovement(Board $board, int $newPosX, int $newPosY) : bool
    {
        if (abs($this->posX - $newPosX) !== abs($this->posY - $newPosY)) {
            dump('invalide diagonal move 1');
            return false;
        }
        $dirX = $this->posX < $newPosX ? 1 : -1;
        $dirY = $this->posY < $newPosY ? 1 : -1;
        $dif = abs($this->posX - $newPosX);
        
        for ($i = 1 ; $i < $dif; $i++) {
            if ($board->hasPieceOnCase($this->posX + $i * $dirX, $this->posY + $i * $dirY)) {
                dump('invalide horizontal move 2');
                return false;
            }
        }
        
        return true;
    }


    public function getColor()
    {
        return $this->color;
    }

    public function setColor($color)
    {
        $this->color = $color;
        return $this;
    }

    public function setPosX($posX)
    {
        $this->posX = $posX;
        return $this;
    }

    public function setPosY($posY)
    {
        $this->posY= $posY;
        return $this;
    }

    public function getPosY()
    {
        return $this->posY;
    }

    public function getPosX()
    {
        return $this->posX;
    }
}
