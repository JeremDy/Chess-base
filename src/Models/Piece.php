<?php

namespace App\Models;


class Piece
{

    protected $posX;
    protected $posY;
    protected $color; 


    public function isValideVerticalMovement()
    {
        if ($posX !== $newPosX) {
            return false;
        } 

        $dirY = $posY < $newPosY ? 1 : -1;
        $dif = abs($posY - $newPosY);
            
        for ($i = 1; $i < $dif; $i++) {
            if (pieceOnCase($posX, $posY + $i * $dirY)) {
                return false;
            }
        }
        return true;
    }

    public function isValideHorizontalMovement()
    {
        if ($posY !== $newPosY) {
            return false;
        }
            
        $dirX = $posX < $newPosX ? 1 : -1;
        $dif = abs($posX - $newPosX);
            
        for ($i = 1; $i < $dif; $i++) {
            if (pieceOnCase($posX + $i * $dirX, $posY)) {
                return false;
            }
        }
        return true;
    }


    public function hasMoved($newPosX, $newPosY)
    {
        if ($posX === $newPosX && $posY === $newPosY) {
            return false;
        }
        
        return true;
    }

    public function newPosExist($newPosX, $newPosY)
    {
        if ($newPosX < 1 || $newPosX > 8 || $newPosY < 1 || $newPosY > 8) {
            return false;
        }
        return true;
    }
  
    public function setColor($color){
        $this->color = $color;
        return $this;
    }

    public function setPosX($posX){
        $this->posX = $posX;
        return $this;
    }

    public function setPosY($posY){
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


