<?php
// src/Controller/LuckyController.php
namespace App\Controller;  // App correspond a src 

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Persistence\ManagerRegistry;

use App\Entity\Tickets;

#[Route('/tickets')]
class TicketController extends AbstractController
{
    #[Route('/', name: "tickets_list")]   // on dit la qu'apres "number" on a une variable | On donne egalement un nom a la route
    public function index(ManagerRegistry $doctrine): Response
    {
        
        $tickets = $doctrine->getRepository(Tickets::class)->findAll();

        // dd($tickets); 

        return $this->render('ticket/list.html.twig', [
            'tickets' => $tickets,
        ]);
    }

   
}