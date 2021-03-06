<?php

namespace App\Controller;

use App\Entity\Message;
use App\Form\MessageType;
use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;
use App\Entity\User;

/**
 * @Route("/message")
 */
class MessageController extends AbstractController
{
    /**
     * @Route("/", name="message_received", methods="GET")
     */
    public function showReceivedMessage(MessageRepository $messageRepository, PaginatorInterface $paginator, Request $request): Response
    {
        $queryBuilder = $messageRepository->findNotDeletedReceivedMessageByUser($this->getUser());

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1),
            3
        );

        return $this->render('message/received_message.html.twig', ['messages' => $pagination ]);
    }


    /**
     * @Route("/sent_list", name="message_sent", methods="GET")
     */
    public function showSentMessage(MessageRepository $messageRepository, PaginatorInterface $paginator, Request $request): Response
    {
        $queryBuilder = $messageRepository->findNotDeletedSentMessageByUser($this->getUser());

        $pagination = $paginator->paginate(
            $queryBuilder,
            $request->query->getInt('page', 1),
            3
        );

        return $this->render('message/sent_message.html.twig', ['messages' => $pagination]);
    }

    /**
     * @Route("/new", name="message_new", methods="GET|POST")
     */
    public function new(Request $request): Response
    {
        $message = new Message();
        $form = $this->createForm(MessageType::class, $message);
        $form->handleRequest($request);
   
        if ($form->isSubmitted() && $form->isValid()) {
            $user =$this->getUser();
            $message->setSender($user)
                ->setSentAt(new \DateTime());
            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();

            return $this->redirectToRoute('message_show',[ 'id' => $message->getId()]);
        }

        return $this->render('message/new.html.twig', [
            'message' => $message,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/answer/{id}", name="message_answer", methods="GET|POST")
     */
    public function answer(Request $request, Message $answeredMessage): Response
    {
        $userToSendMessage = $answeredMessage->getSender();
        $newMessageTitle = 're:'.$answeredMessage->getTitle();

        $message = new Message();
        $form = $this->createForm(MessageType::class, $message);
        $form->get('receiver')->setData($userToSendMessage);
        $form->get('title')->setData($newMessageTitle);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user =$this->getUser();
            $message->setSender($user)
                ->setSentAt(new \DateTime());
            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();

            return $this->redirectToRoute('message_show',[ 'id' => $message->getId()]);
        }

        return $this->render('message/new.html.twig', [
            'message' => $message,
            'form' => $form->createView(),
        ]);
    }


    /**
     * @Route("/user/{id}", name="message_user", methods="GET|POST")
     */
    public function messageToUser(Request $request, User $receiver): Response
    {
        $message = new Message();
        $form = $this->createForm(MessageType::class, $message);
        $form->get('receiver')->setData($receiver);
        $form->handleRequest($request);
   
        if ($form->isSubmitted() && $form->isValid()) {
            $user =$this->getUser();
            $message->setSender($user)
                ->setSentAt(new \DateTime());
            $em = $this->getDoctrine()->getManager();
            $em->persist($message);
            $em->flush();

            return $this->redirectToRoute('message_show',[ 'id' => $message->getId()]);
        }

        return $this->render('message/new.html.twig', [
            'message' => $message,
            'form' => $form->createView(),
        ]);
    }


    /**
     * @Route("/{id}", name="message_show", methods="GET")
     */
    public function show(Message $message): Response
    {
        if($message->getReceiver() === $this->getUser() && false === $message->getDeletedByReceiver() 
        ||$message->getSender() === $this->getUser() && false === $message->getDeletedBySender()){

            if($message->getReceiver() === $this->getUser()){
                $message->setReadByReceiver(true);
                $em = $this->getDoctrine()->getManager();
                $em->flush();
            }
           
            return $this->render('message/show.html.twig', ['message' => $message]);
        }else{

            throw $this->createNotFoundException('Vous n\'avez pas acces à ce message privé');
        }
    }

    /**
     * @Route("/{id}", name="message_delete", methods="DELETE")
     */
    public function delete(Request $request, Message $message): Response
    {
        if ($this->isCsrfTokenValid('delete'.$message->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
           
            if($message->getReceiver() === $this->getUser()){
                $message->setDeletedByReceiver(true);
            }
            if($message->getSender() === $this->getUser()){
               $message->setDeletedBySender(true);
            }
            if(true === $message->getDeletedByReceiver() && true === $message->getDeletedBySender()){            
                $em->remove($message);          
            }
            $em->flush();
        }
        return $this->redirectToRoute('message_received');
    }




    /**
     * @Route("/count", name="message_count", methods="GET")
     */
    public function newMessageCount(MessageRepository $messageRepository)
    {
        $newMessageCount = $messageRepository->countNotReadMessageByUser($this->getUser());
    

        return $this->render('message/_message_count.html.twig',['newMessageCount' => $newMessageCount]
        );



    }
}
