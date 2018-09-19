<?php

namespace App\Models;

class Knight extends Piece
{
    public function canDoThisMove(Board $board, int $newPosX, int $newPosY)
    {
        return true;
    }
}
