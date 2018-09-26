<?php
namespace App\Models;

class Board
{
    private $board;

    public function __construct()
    {
        $board = [];
        //creer le board vide
        for ($i = 1; $i <=8 ; $i++) {
            for ($j = 1; $j <= 8; $j++) {
                $board[$i.'/'.$j] = null;
            }
        }
        //creer les pions
        for ($i=1; $i <= 8; $i++) {
            $board['2/'. $i] = new Pawn();
            $board['7/'.$i] = new Pawn();
        }

        //creer les autres pieces
        for ($i = 1; $i < 9 ; $i += 7) {
            $board[$i.'/1'] = new Rook();
            $board[$i.'/2'] = new Knight();
            $board[$i.'/3'] = new Bishop();
            $board[$i.'/4'] = new King();
            $board[$i.'/5'] = new Queen();
            $board[$i.'/6'] = new Bishop();
            $board[$i.'/7'] = new Knight();
            $board[$i.'/8'] = new Rook();
        }

        //assigne les couleurs et positions;
        for ($i = 1; $i<= 2; $i++) {
            for ($j = 1 ; $j <= 8 ; $j++) {
                $board[$i.'/'.$j]->setColor('white')->setPosX($j)->setPosY($i);
            }
        }

        for ($i = 7; $i<= 8; $i++) {
            for ($j = 1 ; $j <= 8 ; $j++) {
                $board[$i.'/'.$j]->setColor('black')->setPosX($j)->setPosY($i);
            }
        }
        $this->board = $board;
    }


    public function movePiece(Piece $piece, string $newPos)
    {
        $arrayPos = explode('/', $newPos);
        $newPosY = intval($arrayPos[0]);
        $newPosX = intval($arrayPos[1]);

        $this->board[$piece->getPosY().'/'. $piece->getPosX()] = null;
        $piece->setPosX($newPosX)->setPosY($newPosY);
        $this->board[$newPosY.'/'.$newPosX] = $piece;
    }
   
    
    public function hasPieceOnCase(int $posX, int $posY) : bool
    {
        if ($this->board[$posY.'/'.$posX] instanceof Piece) {
            return true;
        }
        return false;
    }

   
    public function hasAllyPieceOnCase(int $posX, int $posY, string $color) : bool
    {
        if ($this->board[$posY.'/'.$posX] instanceof Piece) {
            if ($color === $this->board[$posY.'/'.$posX]->getColor()) {
                return true;
            }
        }
        return false;
    }

    public function hasEnemyPieceOnCase(int $posX, int $posY, string $color) : bool
    {
        if ($this->board[$posY.'/'.$posX] instanceof Piece) {
            if ($color !== $this->board[$posY.'/'.$posX]->getColor()) {
                return true;
            }
        }
        return false;
    }


    public function newPosExist(int $newPosX, int $newPosY) : bool
    {
        if ($newPosX < 1 || $newPosX > 8 || $newPosY < 1 || $newPosY > 8) {
            return false;
        }
        return true;
    }
    

    public function getBoard()
    {
        return $this->board;
    }

    public function getPiece(string $pos)
    {
        return $this->board[$pos];
    }

    //recupération de la possition d'un roi sur le board
    public function getThisKingPos(string $color) : array
    {
        foreach ($this->board as $case) {
            if ($case instanceof King && $case->getColor() === $color) {
                return $arrayPos = [
                   'posX' => $case->getPosX(),
                   'posY' => $case->getPosY()
               ];
            }
        }
    }

    //recupération de toute les pieces d'une couleur dans le board
    public function getAllPieceOfThisColor(string $color) : array
    {
        $arrayResult = [];
        foreach ($this->board as $case) {
            if ($case instanceof Piece && $case->getColor() === $color) {
                $arrayResult[] = $case;
            }
        }
        return $arrayResult;
    }

    //verification si le roi de cette couleur est en echec
    public function thisKingIsCheck($color) : bool
    {
        $kingPos = $this->getThisKingPos($color);
        $opponentColor = $color === 'white' ? 'black' : 'white';
        $opponentPieces = $this->getAllPieceOfThisColor($opponentColor);
    
        foreach ($opponentPieces as $piece) {
            if (true === $piece->canDoThisMove($this, $kingPos['posX'], $kingPos['posY'])) {
                return true;
            }
        }
        return false;
    }

    //verification si le roi de cette couleur est en echet et mat
    public function thisKingIsMat($color)
    {
        $cases = $this->board;
        $pieces = $this->getAllPieceOfThisColor($color);
        
        foreach ($pieces as $piece) {
            foreach ($cases as $pos => $case) {
                $arrayPos = explode('/', $pos);
                $newPosY = intval($arrayPos[0]);
                $newPosX = intval($arrayPos[1]);
                
                if (true === $piece->canDoThisMove($this, $newPosX, $newPosY)) {
                    $savedMove = $this->saveMoveInfo($piece, $newPosX, $newPosY);
                    $this->movePiece($piece, $pos);
                    
                    if (false === $this->thisKingIsCheck($color)) {
                        $this->cancelMove($savedMove);
                        return false;
                    }
                    $this->cancelMove($savedMove);
                }
            }
        }
        return true;
    }

    public function saveMoveInfo(Piece $piece, int $newPosX, int $newPosY) : array
    {
        $savedMove = [
            'piece' => $piece,
            'oldPosX' => $piece->getPosX(),
            'oldPosY'=> $piece->getPosY(),
            'newCaseOldContent' => $this->board[$newPosY .'/'. $newPosX],
            'newPosX' => $newPosX,
            'newPosY' => $newPosY,
        ];
        return $savedMove;
    }

    public function cancelMove(array $savedMove)
    {
        $this->board[$savedMove['oldPosY'] .'/'. $savedMove['oldPosX']] = $savedMove['piece'];
        $this->board[$savedMove['newPosY'] .'/' . $savedMove['newPosX']] = $savedMove['newCaseOldContent'];
        if (is_object($this->board[$savedMove['oldPosY'] .'/'. $savedMove['oldPosX']])) {
            $this->board[$savedMove['oldPosY'] .'/'. $savedMove['oldPosX']]->setPosX($savedMove['oldPosX'])->setPosY($savedMove['oldPosY']);
        }
        if (is_object($this->board[$savedMove['newPosY'] .'/'. $savedMove['newPosX']])) {
            $this->board[$savedMove['newPosY'] .'/'. $savedMove['newPosX']]->setPosX($savedMove['newPosX'])->setPosY($savedMove['newPosY']);
        }
        return;
    }

    
    public function convert() : array
    {
        $jsBoard = [];

        foreach( $this->board as $pos => $case){
    
            if( null === $case ){
                $jsBoard[$pos] = 'E';
            }

            if( null !== $case){
                $color = $case->getColor() === 'white' ? '1' : '0'; 
            }

            if ($case instanceof Piece){
                $jsBoard[$pos] = $case->getCode().$color;
            }
        }
        return $jsBoard;
    }

    public function formatMove($savedMove)
    {
     
    }


}
