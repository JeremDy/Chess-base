<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Models\Board;


class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(UserRepository $userRepository)
    {
        return $this->render('main/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }


}
