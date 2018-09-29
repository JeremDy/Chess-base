<?php

namespace App\Utils\Topic;

use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Client\ClientManipulatorInterface;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Entity\Game;
use App\Entity\User;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Gos\Bundle\WebSocketBundle\Topic\TopicPeriodicTimer;
use Gos\Bundle\WebSocketBundle\Topic\TopicPeriodicTimerInterface;
use App\Models\Board;

class MatchMakingTopic implements TopicInterface, TopicPeriodicTimerInterface
{
    protected $clientManipulator;
    private $doctrine;
    protected $periodicTimer;

    /**
     * @param ClientManipulatorInterface $clientManipulator
     */
    public function __construct(ClientManipulatorInterface $clientManipulator, ManagerRegistry $doctrine, UrlGeneratorInterface $urlGenerator)
    {
        $this->clientManipulator = $clientManipulator;
        $this->doctrine = $doctrine;
        $this->urlGenerator = $urlGenerator;
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
        $connection->event($topic->getId(), ['confirm' => 'En attente d\'un adversaire']);
    }

     
    public function setPeriodicTimer(TopicPeriodicTimer $periodicTimer)
    {
        $this->periodicTimer = $periodicTimer;
    }

    public function registerPeriodicTimer(Topic $topic)
    {
        $this->periodicTimer->addPeriodicTimer($this, 'match', 4, function () use ($topic) {
            $subscribers = $this->clientManipulator->getAll($topic);
           
            if (count($topic) >= 2) {
                $playerOne = $subscribers[count($topic) - 1];
                $playerTwo = $subscribers[count($topic)- 2];
        
                $playerOneUserName = $playerOne['client']->getUsername();
                $playerTwoUserName = $playerTwo['client']->getUsername();
                
                if (false !== $playerOne && false !== $playerTwo) {
                    $playerOneDoctrine = $this->doctrine->getRepository(User::class)->findOneByUsername($playerOne['client']->getUsername());
                    $playerTwoDoctrine = $this->doctrine->getRepository(User::class)->findOneByUsername($playerTwo['client']->getUsername());
                    
                    $game = new Game();
                    $game->setStartedAt(new \DateTime())
                        ->setPlayerOne($playerOneDoctrine)
                        ->setPlayerTwo($playerTwoDoctrine)
                        ->setPlayerWhoCanPlay($playerOneDoctrine)
                        ->setChessBoard(new Board);
                    
                    $this->doctrine->getManager()->persist($game);
                    $this->doctrine->getManager()->flush();
                    
                    $topic->broadcast(
                        [
                            'matchFound' => $this->urlGenerator->generate('game', ['id' =>  $game->getId()]),
                        ],
                        array(),
                        array(
                            $playerOne['connection']->WAMP->sessionId,
                            $playerTwo['connection']->WAMP->sessionId
                            )
                        );
                }
            }
        });
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
    }

    /**
    * Like RPC is will use to prefix the channel
    * @return string
    */
    public function getName()
    {
        return 'matchmaking.topic';
    }
}
