<?php

namespace App\Utils\Topic;

use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Client\ClientManipulatorInterface;

class MatchMakingTopic implements TopicInterface
{
    
    protected $clientManipulator;

    /**
     * @param ClientManipulatorInterface $clientManipulator
     */
    public function __construct(ClientManipulatorInterface $clientManipulator)
    {
        $this->clientManipulator = $clientManipulator;
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
        $user = $this->clientManipulator->getClient($connection);
        
        $subcribers = $this->clientManipulator->getAll($topic);
        
        if(count($topic) >= 2){
            
            $playerOne = $subcribers[count($topic) - 2 ];
            $playerTwo = $subcribers[count($topic) - 1 ];
    
            $playerOneUserName = $playerOne['client']->getUsername();
            $playerTwoUserName = $playerTwo['client']->getUsername();
            
            if (false !== $playerOne && false !== $playerTwo) {
                $topic->broadcast(
                [
                    'matchFound' => $playerOneUserName .'/'. $playerTwoUserName,
                ],
                array(),
                array(
                    $playerOne['connection']->WAMP->sessionId,
                    $playerTwo['connection']->WAMP->sessionId
                    )
            );
        }


        }

        //this will broadcast the message to ALL subscribers of this topic.
        /*$topic->broadcast(['msg' => $connection->resourceId . " has joined " . $topic->getId()]);*/
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
        //this will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast(['msg' => $connection->resourceId . " has left " . $topic->getId()]);
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
    
        $user = $this->clientManipulator->getClient($connection);
        /*
        	$topic->getId() will contain the FULL requested uri, so you can proceed based on that

            if ($topic->getId() === 'acme/channel/shout')
     	       //shout something to all subs.
        */
       
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