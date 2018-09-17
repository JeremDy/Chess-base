<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use FOS\UserBundle\Doctrine\UserManager;
use FOS\UserBundle\Security\UserProvide;

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

    /**
     * @Route("/profile/{id}", name="profile")
     */
    public function ShowProfile($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('App:User')->find($id);

        // $userManager = $this->get('fos_user.user_manager');
        // $user = $userManager->findUserBy(array('id' => $id));
    //     if (!$entity)
    // {
    //     throw $this->createNotFoundException('Unable to find User entity.');
    // }

        return $this->render('@FOSUser/Profile/show.html.twig', array(
            'user' => $user,
        ));
    }
}
