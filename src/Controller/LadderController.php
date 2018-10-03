<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;
use App\Repository\UserRepository;

class LadderController extends AbstractController
{

    /**
     * @Route("/ladder", name="ladder_index", methods="GET")
     */
    public function orderByWin(UserRepository $userRepository,PaginatorInterface $paginator, Request $request) : response
    {
        $queryBuilder = $userRepository->findAllUserByNbWin();

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1),
            5
        );

        return $this->render('ladder/index.html.twig', ['users' => $pagination]);
    }



    /**
     * @Route("/ladder/by_name", name="ladder_name", methods="GET")
     */
    public function orderByName(UserRepository $userRepository,PaginatorInterface $paginator, Request $request) : response
    {

        $queryBuilder = $userRepository->findAllUserByName();

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1),
            5
        );

        

        return $this->render('ladder/index.html.twig', ['users' => $pagination]);
    }



    /**
     * @Route("/ladder/by_game", name="ladder_game", methods="GET")
     */
    public function orderByNbGame(UserRepository $userRepository,PaginatorInterface $paginator, Request $request) : response
    {

        $queryBuilder = $userRepository->findAllUserByNbGame();

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1),
            5
        );

        
        return $this->render('ladder/index.html.twig', ['users' => $pagination]);
    }



    /**
     * @Route("/ladder/by_lose", name="ladder_lose", methods="GET")
     */
    public function orderByLose(UserRepository $userRepository,PaginatorInterface $paginator, Request $request) : response
    {

        $queryBuilder = $userRepository->findAllUserByNbLose();

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1),
            5
        );

        
        return $this->render('ladder/index.html.twig', ['users' => $pagination]);
    }








}