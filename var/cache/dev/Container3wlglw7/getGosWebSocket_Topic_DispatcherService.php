<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'gos_web_socket.topic.dispatcher' shared service.

include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Client/ClientManipulatorInterface.php';
include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Client/ClientManipulator.php';
include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Topic/TopicInterface.php';
include_once $this->targetDirs[3].'/src/Utils/Topic/ChatTopic.php';
include_once $this->targetDirs[3].'/src/Utils/Topic/MatchMakingTopic.php';
include_once $this->targetDirs[3].'/src/Utils/Topic/GameTopic.php';
include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Server/App/Registry/TopicRegistry.php';
include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Topic/TopicPeriodicTimer.php';
include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Server/App/Dispatcher/TopicDispatcherInterface.php';
include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Server/App/Dispatcher/TopicDispatcher.php';

$a = ($this->privates['gos_web_socket.wamp.topic_manager'] ?? $this->load('getGosWebSocket_Wamp_TopicManagerService.php'));

if (isset($this->privates['gos_web_socket.topic.dispatcher'])) {
    return $this->privates['gos_web_socket.topic.dispatcher'];
}

$b = new \Gos\Bundle\WebSocketBundle\Server\App\Registry\TopicRegistry();
$b->addTopic(new \App\Utils\Topic\ChatTopic(new \Gos\Bundle\WebSocketBundle\Client\ClientManipulator(($this->privates['gos_web_socket.client_storage'] ?? $this->load('getGosWebSocket_ClientStorageService.php')), ($this->privates['gos_web_socket.websocket_authentification.provider'] ?? $this->load('getGosWebSocket_WebsocketAuthentification_ProviderService.php')))));
$b->addTopic(new \App\Utils\Topic\MatchMakingTopic(new \Gos\Bundle\WebSocketBundle\Client\ClientManipulator(($this->privates['gos_web_socket.client_storage'] ?? $this->load('getGosWebSocket_ClientStorageService.php')), ($this->privates['gos_web_socket.websocket_authentification.provider'] ?? $this->load('getGosWebSocket_WebsocketAuthentification_ProviderService.php'))), ($this->services['doctrine'] ?? $this->getDoctrineService()), ($this->services['router'] ?? $this->getRouterService())));
$b->addTopic(new \App\Utils\Topic\GameTopic(new \Gos\Bundle\WebSocketBundle\Client\ClientManipulator(($this->privates['gos_web_socket.client_storage'] ?? $this->load('getGosWebSocket_ClientStorageService.php')), ($this->privates['gos_web_socket.websocket_authentification.provider'] ?? $this->load('getGosWebSocket_WebsocketAuthentification_ProviderService.php')))));

return $this->privates['gos_web_socket.topic.dispatcher'] = new \Gos\Bundle\WebSocketBundle\Server\App\Dispatcher\TopicDispatcher($b, ($this->privates['gos_web_socket.router.wamp'] ?? $this->load('getGosWebSocket_Router_WampService.php')), new \Gos\Bundle\WebSocketBundle\Topic\TopicPeriodicTimer(($this->privates['gos_web_socket.server.event_loop'] ?? $this->load('getGosWebSocket_Server_EventLoopService.php'))), $a, ($this->services['monolog.logger.websocket'] ?? $this->load('getMonolog_Logger_WebsocketService.php')));
$c = new \Gos\Bundle\WebSocketBundle\Client\ClientManipulator(($this->privates['gos_web_socket.client_storage'] ?? $this->load('getGosWebSocket_ClientStorageService.php')), ($this->privates['gos_web_socket.websocket_authentification.provider'] ?? $this->load('getGosWebSocket_WebsocketAuthentification_ProviderService.php')));

