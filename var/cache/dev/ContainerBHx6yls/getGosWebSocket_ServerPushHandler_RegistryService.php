<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'gos_web_socket.server_push_handler.registry' shared service.

include_once $this->targetDirs[3].'/vendor/gos/web-socket-bundle/Pusher/ServerPushHandlerRegistry.php';

return $this->privates['gos_web_socket.server_push_handler.registry'] = new \Gos\Bundle\WebSocketBundle\Pusher\ServerPushHandlerRegistry();
