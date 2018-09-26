<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\Request;




class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(ArticleRepository $articleRepository)
    {
        return $this->render('main/index.html.twig', [
            'article' => $articleRepository->findLastArticle(),
        ]);
    }


}
