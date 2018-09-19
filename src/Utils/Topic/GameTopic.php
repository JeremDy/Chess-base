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


class GameTopic implements TopicInterface
{
    
    protected $clientManipulator;
    private $doctrine;

    /**
     * @param ClientManipulatorInterface $clientManipulator
     */
    public function __construct(ClientManipulatorInterface $clientManipulator, ManagerRegistry $doctrine)
    {
        $this->clientManipulator = $clientManipulator;
        $this->doctrine = $doctrine;
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
            $connection->send('user non connecté ?!'); 
            return;
        }
       
       
        $playerName = $user->getUsername();
        $player = $this->clientManipulator->findByUsername($topic, $playerName);
        
        
        //si l'user  === game->playerWhoCanplay
        if ($user->getId() === $game->getPlayerWhoCanPlay()->getId()) {
            $topic->broadcast(
                [
                    'canPlay' => true,
                ],
                array(),
                array($player['connection']->WAMP->sessionId)
                );          
            return;  
        }

        //si l'user !=== game ->player whoCan play
        if ($user->getId() !== $game->getPlayerWhoCanPlay()->getId()) {
            $topic->broadcast(
                [
                    'canPlay' => false,
                ],
                array(),
                array($player['connection']->WAMP->sessionId)
                );          
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

        $gameId = $request->getAttributes()->get('gameId');
        $game = $this->doctrine->getRepository(Game::class)->findOneById($gameId);
        $user = $this->clientManipulator->getClient($connection);
    
        if (!is_object($user)) {
            dump('user not connected');
            return;
        }
 
        $playerName = $user->getUsername();
        $playerColor = $playerName === $request->getAttributes()->get('playerOne') ? 'white' : 'black';
        $opponentName =  $playerName === $request->getAttributes()->get('playerOne') ? $request->getAttributes()->get('playerTwo') : $request->getAttributes()->get('playerOne'); 

        $player = $this->clientManipulator->findByUsername($topic, $playerName);
        $opponent = $this->clientManipulator->findByUsername($topic, $opponentName);
    
  
        if($user->getId() !== $game->getPlayerWhoCanPlay()->getId()){                
            $topic->broadcast(
                [
                    'error' => 'Ce n\'est pas votre tour.',
                ],
                array(),
                array($player['connection']->WAMP->sessionId)
                );          
            return;       
        }
    
        $board = $game->getChessBoard();
        $piece = $board->getPiece(key($event[1]));  
        
        if(null === $piece){
            $topic->broadcast(
                [
                    'error' => 'Cette piece n\'existe pas !',
                ],
                array(),
                array($player['connection']->WAMP->sessionId)
                );               
            return;
        }
        
        if($playerColor !== $piece->getColor()){
            $topic->broadcast(
                [
                    'error' => 'Ce n\'est pas une de vos pieces!',
                ],
                array(),
                array($player['connection']->WAMP->sessionId)
                );               
            return;
        }
       
        $arrayPos = explode('/', key($event[0]));
        $newPosY = intval($arrayPos[0]);
        $newPosX = intval($arrayPos[1]);

        $verification = $piece->canDothismove($board, $newPosX, $newPosY);
    
        if(false === $verification){
            $topic->broadcast(
                [
                    'error' => 'Ce mouvement est incorect !',
                ],
                array(),
                array($player['connection']->WAMP->sessionId)
                );               
            return;
        }

        //'bouge la piece' ,met à jour le board.
        $board->movePiece($piece, (key($event[0])));
        $game->setPlayerWhoCanPlay($this->doctrine->getRepository(User::class)->findOneByUsername($opponentName));
       
        $topic->broadcast(
            [
                'canPlay' => false,
                'message' => 'Tu as finis ton tour',
            ],
            array(),
            array($player['connection']->WAMP->sessionId)
            ); 

        $topic->broadcast(
            [
                'canPlay'=> true,
                'message' => 'Ton adversaire à joué, à ton tour',
                'movement' => $event,
            ],
            array(),
            array($opponent['connection']->WAMP->sessionId)
            );    

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