<?php

namespace App\Models;

class Piece
{
    protected $posX;
    protected $posY;
    protected $color;
    protected $code;
    protected $hasMoved;


   
    public function hasMoved(int $newPosX, int $newPosY) : bool
    {
        if ($this->posX === $newPosX && $this->posY === $newPosY) {
            return false;
        }
        return true;
    }

    
    public function isDoingValideVerticalMovement(Board $board, int $newPosX, int $newPosY) : bool
    {
        if ($this->posX !== $newPosX) {
            return false;
        }

        $dirY = $this->posY < $newPosY ? 1 : -1;
        $dif = abs($this->posY - $newPosY);
            
        for ($i = 1; $i < $dif; $i++) {
            if ($board->hasPieceOnCase($this->posX, $this->posY + $i * $dirY)) {
                return false;
            }
        }
        return true;
    }
    
    public function isDoingValideHorizontalMovement(Board $board, int $newPosX, int $newPosY) : bool
    {
        if ($this->posY !== $newPosY) {
            return false;
        }
        $dirX = $this->posX < $newPosX ? 1 : -1;
        $dif = abs($this->posX - $newPosX);
            
        for ($i = 1; $i < $dif; $i++) {
            if ($board->hasPieceOnCase($this->posX + $i * $dirX, $this->posY)) {
                return false;
            }
        }
        return true;
    }

    public function isDoingValideDiagonalMovement(Board $board, int $newPosX, int $newPosY) : bool
    {
        if (abs($this->posX - $newPosX) !== abs($this->posY - $newPosY)) {
            return false;
        }
        $dirX = $this->posX < $newPosX ? 1 : -1;
        $dirY = $this->posY < $newPosY ? 1 : -1;
        $dif = abs($this->posX - $newPosX);
        
        for ($i = 1 ; $i < $dif; $i++) {
            if ($board->hasPieceOnCase($this->posX + $i * $dirX, $this->posY + $i * $dirY)) {
                return false;
            }
        }
        
        return true;
    }


    public function getHasMoved()
    {
        return $this->hasMoved;
    }

    public function setHasMoved($hasMoved)
    {
        $this->hasMoved = $hasMoved;
        return $this;
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

    public function getCode()
    {
        return $this->code;
    }
}
