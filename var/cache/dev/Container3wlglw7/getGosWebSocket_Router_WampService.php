<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'gos_web_socket.router.wamp' shared service.

include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Router/WampRouter.php';

return $this->privates['gos_web_socket.router.wamp'] = new \Gos\Bundle\WebSocketBundle\Router\WampRouter(($this->privates['gos_pubsub_router.websocket'] ?? $this->load('getGosPubsubRouter_WebsocketService.php')), true, ($this->services['monolog.logger.websocket'] ?? $this->load('getMonolog_Logger_WebsocketService.php')));
