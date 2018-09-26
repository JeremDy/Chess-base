<?php

namespace App\Utils\Topic;

use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Client\ClientManipulatorInterface;
use App\Entity\Game;
use App\Entity\User;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Utils\GameTopicMessage;

class GameTopic implements TopicInterface
{
    protected $clientManipulator;
    private $doctrine;
    private $gameTopicMessage;

    /**
     * @param ClientManipulatorInterface $clientManipulator
     */
    public function __construct(ClientManipulatorInterface $clientManipulator, ManagerRegistry $doctrine, GameTopicMessage $gameTopicMessage)
    {
        $this->clientManipulator = $clientManipulator;
        $this->doctrine = $doctrine;
        $this->gameTopicMessage = $gameTopicMessage;
    }
            
    /**
     * This will receive any Subscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @return void
     */
    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        $gameId = $request->getAttributes()->get('gameId');
        $game = $this->doctrine->getRepository(Game::class)->findOneById($gameId);
        $user = $this->clientManipulator->getClient($connection);

     
        if (!is_object($user)) {
            dump('user not connected');
            return;
        }
          
        $playerName = $user->getUsername();
        $playerColor = $playerName === $request->getAttributes()->get('playerOne') ? 'white' : 'black';
        $playerSessionId = $this->clientManipulator->findByUsername($topic, $playerName)['connection']->WAMP->sessionId;

        $board = $game->getChessBoard();
        $this->gameTopicMessage->lastBoard($topic, $board, $playerSessionId);
        
      
        $playerName = $user->getUsername();
        $playerSessionId = $this->clientManipulator->findByUsername($topic, $playerName)['connection']->WAMP->sessionId;
          
        //si l'user  === game->playerWhoCanplay
        if ($user->getId() === $game->getPlayerWhoCanPlay()->getId()) {
            $this->gameTopicMessage->canPlay(true, $topic, $playerSessionId);
            return;
        }

        //si l'user !=== game ->player whoCan play
        if ($user->getId() !== $game->getPlayerWhoCanPlay()->getId()) {
            $this->gameTopicMessage->canPlay(false, $topic, $playerSessionId);
            return;
        }
    }

    /**
     * This will receive any UnSubscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @return void
     */
    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
    }


    /**
     * This will receive any Publish requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @param $event
     * @param array $exclude
     * @param array $eligible
     * @return mixed|void
     */
    public function onPublish(ConnectionInterface $connection, Topic $topic, WampRequest $request, $event, array $exclude, array $eligible)
    {   
        dump($event);
        $gameId = $request->getAttributes()->get('gameId');
        $game = $this->doctrine->getRepository(Game::class)->findOneById($gameId);
        $user = $this->clientManipulator->getClient($connection);
        $board = $game->getChessBoard();
    
        if (!is_object($user)) {
            dump('user not connected');
            return;
        }
 
        $playerName = $user->getUsername();
        $playerColor = $playerName === $request->getAttributes()->get('playerOne') ? 'white' : 'black';
        $playerSessionId = $this->clientManipulator->findByUsername($topic, $playerName)['connection']->WAMP->sessionId;
 
        $opponentName =  $playerName === $request->getAttributes()->get('playerOne') ? $request->getAttributes()->get('playerTwo') : $request->getAttributes()->get('playerOne');
        $opponentColor = $playerColor === 'white' ? 'black' : 'white';
        $opponentConnectionObject = $this->clientManipulator->findByUsername($topic, $opponentName)['connection'];

       
        
        if (!is_object($opponentConnectionObject)) {
            $this->gameTopicMessage->lastBoard($topic, $board,$playerSessionId);
            $this->gameTopicMessage->notConnectedOpponent($topic, $playerSessionId);
            return;
        }
        $opponentSessionId = $opponentConnectionObject->WAMP->sessionId;

        $this->gameTopicMessage->lastBoard($topic, $board, $playerSessionId, $opponentSessionId);
        
        if ($user->getId() !== $game->getPlayerWhoCanPlay()->getId()) {
            $this->gameTopicMessage->notYourTurn($topic, $playerSessionId);
            return;
        }
    
       
        $piece = $board->getPiece($event['movement']['old']);

        //position d'arrivé du mouvement essayé:
        $arrayPos = explode('/', $event['movement']['new']);
        $newPosY = intval($arrayPos[0]);
        $newPosX = intval($arrayPos[1]);
        
        if (null === $piece) {
            $this->gameTopicMessage->notExistingPiece($topic, $playerSessionId);
            return;
        }
        
        if ($playerColor !== $piece->getColor()) {
            $this->gameTopicMessage->notYourPiece($topic, $playerSessionId);
            return;
        }
                 
        //verification si le mouvement est valide.
        if (false === $piece->canDothismove($board, $newPosX, $newPosY)) {
            $this->gameTopicMessage->invalidMovement($topic, $playerSessionId);
            return;
        }
                
        //'bouge la piece' ,met à jour le board.
        $savedMove = $board->saveMoveInfo($piece, $newPosX, $newPosY);
        $board->movePiece($piece, $event['movement']['new']);

        //si le mouvement a mis en echec notre roi : message d'erreur, et on annule le mouvement.
        if (true === $board->thisKingIsCheck($playerColor)) {
            $this->gameTopicMessage->selfCheck($topic, $playerSessionId);
            $board->cancelMove($savedMove);
            return;
        }

        //verif si le roi adverse est en echec apres le mouvement.
        if (true === $board->thisKingIsCheck($opponentColor)) {
            //verif si il y'a echec et mat !
            if (true === $board->thisKingIsMat($opponentColor)) {
                $this->gameTopicMessage->canPlay(false, $topic, $playerSessionId);
                $this->gameTopicMessage->checkMate($topic, $playerSessionId, $opponentSessionId);                
                return;
            }
            $this->gameTopicMessage->check($topic, $playerSessionId, $opponentSessionId);
        }
              
        $game->setPlayerWhoCanPlay($this->doctrine->getRepository(User::class)->findOneByUsername($opponentName));
        $this->gameTopicMessage->endTurn($topic, $event, $playerSessionId, $opponentSessionId);
    }

    /**
    * Like RPC is will use to prefix the channel
    * @return string
    */
    public function getName()
    {
        return 'game.topic';
    }
}
