<?php

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.
// Returns the private 'templating.helper.assets' shared service.

include_once $this->targetDirs[3].'/vendor/symfony/templating/Helper/HelperInterface.php';
include_once $this->targetDirs[3].'/vendor/symfony/templating/Helper/Helper.php';
include_once $this->targetDirs[3].'/vendor/symfony/framework-bundle/Templating/Helper/AssetsHelper.php';

return $this->privates['templating.helper.assets'] = new \Symfony\Bundle\FrameworkBundle\Templating\Helper\AssetsHelper(($this->privates['assets.packages'] ?? $this->getAssets_PackagesService()));
