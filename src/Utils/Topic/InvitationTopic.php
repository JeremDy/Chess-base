<?php

namespace App\Utils\Topic;

use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Client\ClientManipulatorInterface;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Entity\Game;
use App\Entity\User;

class InvitationTopic implements TopicInterface
{
    protected $clientManipulator;

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
        if('invitation_channel'=== $request->getRouteName()){
            $topic->broadcast(['type' => 'cancel']);

        }
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
            
        if (is_object($user)) {
           
            if ($topic->getId() === 'invitation') {
                
                $receiverName = $event['receiver'];
                $senderName = $user->getUsername();
    
                $receiver = $this->clientManipulator->findByUsername($topic, $receiverName);
                $sender = $this->clientManipulator->findByUsername($topic, $senderName);

                if (is_array($receiver)) {
                    $topic->broadcast(
                        [
                            'type' => 'invite',
                            'sender' => $senderName,
                            'message' => $senderName . ' vous invite pour une partie !',
                            'channel' => 'invitation/' . $senderName . '/'. $receiverName,
                        ],
                        array(),
                        array($receiver['connection']->WAMP->sessionId)
                    );
                }
            }
            
            if ('invitation_channel' === $request->getRouteName()) {
                if ($event['type'] === 'accept') {
                    $topic->broadcast(['type' => 'response']);
                }
                if ($event['type'] === 'refuse') {
                    $topic->broadcast(['type' => 'refuse']);
                }

                if ($event['type'] === 'accept') {
                    
                    $subscribers = $this->clientManipulator->getAll($topic);
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
                            ->setPlayerWhoCanPlay($playerOneDoctrine);
                        
                        $this->doctrine->getManager()->persist($game);
                        $this->doctrine->getManager()->flush();
                        
                        $topic->broadcast(
                            [
                                'type' =>'accept',
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
            }
         }
    }
            
            
            /*
            else{

                $topic->broadcast(
                    [
                    'sender' => 'Erreur :' ,
                    'message' => 'Aucun utilisateur du nom de '.$receiverName. ' n\'est actuellement connecté.',
                    ],
                    array(),
                    array($sender['connection']->WAMP->sessionId)
                    );

            }    */ 
        
        
    

    /**
    * Like RPC is will use to prefix the channel
    * @return string
    */
    public function getName()
    {
        return 'invitation.topic';
    }
}