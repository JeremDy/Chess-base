<?php

namespace App\Controller;

use App\Entity\Message;
use App\Form\MessageType;
use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/message")
 */
class MessageController extends AbstractController
{
    /**
     * @Route("/", name="message_received", methods="GET")
     */
    public function receivedMessage(MessageRepository $messageRepository): Response
    {
        $messages = $messageRepository->findNotDeletedReceivedMessageByUser($this->getUser());

        return $this->render('message/received_message.html.twig', ['messages' => $messages ]);
    }


    /**
     * @Route("/sent_list", name="message_sent", methods="GET")
     */
    public function sentMessage(MessageRepository $messageRepository): Response
    {
        $messages = $messageRepository->findNotDeletedSentMessageByUser($this->getUser());

        return $this->render('message/sent_message.html.twig', ['messages' => $messages]);
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

            return $this->redirectToRoute('message_received');
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

            return $this->redirectToRoute('message_received');
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
}
