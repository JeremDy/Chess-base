<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'Symfony\Component\HttpFoundation\Session\Storage\Handler\PdoSessionHandler' shared autowired service.

include_once $this->targetDirs[3].'/vendor/symfony/http-foundation/Session/Storage/Handler/AbstractSessionHandler.php';
include_once $this->targetDirs[3].'/vendor/symfony/http-foundation/Session/Storage/Handler/PdoSessionHandler.php';

return $this->privates['Symfony\Component\HttpFoundation\Session\Storage\Handler\PdoSessionHandler'] = new \Symfony\Component\HttpFoundation\Session\Storage\Handler\PdoSessionHandler(($this->services['doctrine.dbal.default_connection'] ?? $this->load('getDoctrine_Dbal_DefaultConnectionService.php'))->getWrappedConnection(), array('lock_mode' => 0));
