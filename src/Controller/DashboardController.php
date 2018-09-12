<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;

final class DashboardController extends Controller
{
    /**
     * @Route("/", name="dashboard")
     */
    public function dashboard(UserRepository $userRepository): Response
    {
        return $this->render('main/index.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }
}