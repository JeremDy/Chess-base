<?php
namespace App\Models;

class Board
{
    private $board;
    private $moveData;


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
            dump('not existing pos');
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


    public function getWhiteKingPos() : array
    {
        foreach( $this->board as $case){
            if($case instanceof King && $case->getColor() === 'white'){

               return $arrayPos = [
                   'posX' => $case->getPosX(),
                   'posY' => $case->getPosY()
               ];
            }
        }
    }

    public function getBlackKingPos() : array
    {
        foreach( $this->board as $case){
            if($case instanceof King && $case->getColor() === 'black'){

               return $arrayPos = [
                   'posX' => $case->getPosX(),
                   'posY' => $case->getPosY()
               ];
            }
        }
    }

   
    public function getAllBlackPiece() : array
    {
       $arrayResult = [];
        foreach ($this->board as $case) {
            if ($case instanceof Piece && $case->getColor() === 'black') {
                $arrayResult[] = $case;
            }
        }
        return $arrayResult;     
    }

    public function getAllWhitePiece() : array
    {
       $arrayResult = [];
        foreach ($this->board as $case) {
            if ($case instanceof Piece && $case->getColor() === 'white') {
                $arrayResult[] = $case;
            }
        }
        return $arrayResult;     
    }


    public function whiteKingIsCheck() :bool
    {
        $whiteKingPos = $this->getWhiteKingPos(); 
        $blackPieces = $this->getAllBlackPiece();
      
        foreach($blackPieces as $piece){
            if(true === $piece->canDoThisMove($this,$whiteKingPos['posX'],$whiteKingPos['posY'])){
                return true;
            }
        }
        return false;
    }

    public function blackKingIsCheck() :bool
    {
        $blackKingPos = $this->getblackKingPos();
        $whitePieces = $this->getAllWhitePiece();
        foreach($whitePieces as $piece){
            if(true === $piece->canDoThisMove($this,$backKingPos['posX'],$blackKingPos['posY'])){
                return true;
            }
        }
        return false;
    }

    
    public function whiteKingIsMat(){
        
        $cases = $this->board;
        $whitePieces = $this->getAllWhitePiece();
        foreach ($whitePieces as $piece) {
            foreach ($cases as $pos => $case) {
                $arrayPos = explode('/', $pos);
                $newPosY = intval($arrayPos[0]);
                $newPosX = intval($arrayPos[1]);
                if (true === $piece->canDoThisMove($this, $newPosX, $newPosY)) {
                    $newCaseContent = $this->board[$pos];
                    $oldPiecePosX = $piece->getPosX();
                    $oldPiecePosY = $piece->getPosY();
                    
                    $this->movePiece($piece, $pos);
                    
                    if (false === $this->whiteKingIsCheck()) {
                        $this->board[$pos] = $newCaseContent;
                        $this->board[$oldPiecePosY.'/'.$oldPiecePosX] = $piece;
                        if ($this->board[$pos] !== null) {
                            $this->board[$pos]->setPosX($newPosX)->setPosY($newPosY);
                        }
                        if ($this->board[$oldPiecePosY.'/'.$oldPiecePosX] !== null) {
                            $this->board[$oldPiecePosY.'/'.$oldPiecePosX]->setPosX($oldPiecePosX)->setPosY($oldPiecePosY);
                        }

                        return false;
                    }
                    $this->board[$pos] = $newCaseContent;
                    $this->board[$oldPiecePosY.'/'.$oldPiecePosX] = $piece;
                    if ($this->board[$pos] !== null) {
                        $this->board[$pos]->setPosX($newPosX)->setPosY($newPosY);
                    }
                    if ($this->board[$oldPiecePosY.'/'.$oldPiecePosX] !== null) {
                        $this->board[$oldPiecePosY.'/'.$oldPiecePosX]->setPosX($oldPiecePosX)->setPosY($oldPiecePosY);
                    }
                }
            }
        }
        return true;
    }
}






// recuperer chaque piece alllié;
//boucler sur les pieces, pour chaque pieces :
//boucler sur toutes les cases du board, pour chaque case :
//piece->canDoThisMove()?
//si oui : y'a notre roi et t'il tjrs en echec?
//si une solution est trouvé : pas echec et mat, sinon echect et mat




