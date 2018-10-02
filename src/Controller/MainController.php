<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ArticleRepository;
use Symfony\Component\HttpFoundation\Request;
use App\Form\FriendType;
use App\Repository\UserRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotBlank;




class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(ArticleRepository $articleRepository)
    {       
        if (true === $this->getUser()->IsInGame()){
            $games = $this->getUser()->getGames();
        }

        return $this->render('main/index.html.twig', [
            'article' => $articleRepository->findLastArticle(),
            'games' => isset($games) ? $games : false,
        ]);
    }

     /**
     * @Route("/friends", name="friendList")
     */
    public function FriendList(Request $request, UserRepository $userRepository)
    {
        
        $notFriends = $userRepository->findNotFriend($this->getUser()->getId());
        
        $form = $this->createFormBuilder()
            ->add('newFriend', EntityType::class, array(
                'constraints' => new NotBlank(),
                'label' => false,
                'class' => User::class,
                'choices' => $notFriends,
                'multiple' => false,
                'placeholder' => 'Ajouter un ami',       
            ))->getForm();    

        $form->handleRequest($request);
            
      
        if ($form->isSubmitted() && $form->isValid()) {
            $friend = $form->getData()['newFriend']; 
            $this->getUser()->addMyFriend($friend);
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('friendList');  
        }

        $list = $this->getUser()->getMyFriends();

        return $this->render('main/ListFriend.html.twig', array(
            'list' => $list,
            'notFriends' => $notFriends,
            'form' => $form->createView(),
        ));
    }

    /**
     * @Route("/add/{id}", name="add")
     */
    public function addAction($id)
    {
        $list = $this->getUser()->getMyFriends();

        $user = $this->getDoctrine()
                ->getRepository('App:User')
                ->find($id)
            ;
        if ($this->getUser() != $user) {
                $this->getUser()->addMyFriend($user);
                $list = $this->getUser()->getMyFriends();
                $this->getDoctrine()->getManager()->flush();
                        
        }
        return $this->redirectToRoute('friendList');
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function removeAction($id)
    {
        $list = $this->getUser()->getMyFriends();

        $user = $this->getDoctrine()
                     ->getRepository('App:User')
                     ->find($id)
                    ;

        $this->getUser()->removeMyFriend($user);
        $this->getDoctrine()->getManager()->flush();
         
        return $this->redirectToRoute('friendList');
    }

}
