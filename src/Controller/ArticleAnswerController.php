<?php

namespace App\Controller;

use App\Entity\ArticleAnswer;
use App\Form\ArticleAnswerType;
use App\Repository\ArticleAnswerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/article/answer")
 */
class ArticleAnswerController extends AbstractController
{
    /**
     * @Route("/", name="article_answer_index", methods="GET")
     */
    public function index(ArticleAnswerRepository $articleAnswerRepository): Response
    {
        return $this->render('article_answer/index.html.twig', ['article_answers' => $articleAnswerRepository->findAll()]);
    }

    /**
     * @Route("/new", name="article_answer_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $articleAnswer = new ArticleAnswer();
        $form = $this->createForm(ArticleAnswerType::class, $articleAnswer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($articleAnswer);
            $em->flush();

            return $this->redirectToRoute('article_answer_index');
        }

        return $this->render('article_answer/new.html.twig', [
            'article_answer' => $articleAnswer,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="article_answer_show", methods="GET")
     */
    public function show(ArticleAnswer $articleAnswer): Response
    {
        return $this->render('article_answer/show.html.twig', ['article_answer' => $articleAnswer]);
    }

    /**
     * @Route("/{id}/edit", name="article_answer_edit", methods="GET|POST")
     */
    public function edit(Request $request, ArticleAnswer $articleAnswer): Response
    {
        $form = $this->createForm(ArticleAnswerType::class, $articleAnswer);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('article_show', ['id' => $articleAnswer->getArticle()->getId()]);
        }

        return $this->render('article_answer/edit.html.twig', [
            'article_answer' => $articleAnswer,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="article_answer_delete", methods="DELETE")
     */
    public function delete(Request $request, ArticleAnswer $articleAnswer): Response
    {
        if ($this->isCsrfTokenValid('delete'.$articleAnswer->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($articleAnswer);
            $em->flush();
        }

        return $this->redirectToRoute('article_show', ['id' => $articleAnswer->getArticle()->getId()]);
    }
}
