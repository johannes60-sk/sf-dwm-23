<?php
// src/Controller/LuckyController.php
namespace App\Controller;  // App correspond a src 

use App\Entity\Product;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Persistence\ManagerRegistry;

use App\Entity\Tickets;
use App\Form\Type\TicketType;
// use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Request;

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

    #[Route('/ticketId/{id}', name: 'tickets_show')]
    public function show(ManagerRegistry $doctrine, int $id): Response{

        $ticket = $doctrine->getRepository(Tickets::class)->find($id);

        if(!$ticket){
            throw $this->createNotFoundException(

               'No ticket found for id'  . $id
            );
        }

        return $this->render('ticket/show.html.twig', [

            'ticket' => $ticket,
        ]);

    }

    #[Route('/newTicket', name:'create_ticket')]
    public function createTicket(Request $request, ManagerRegistry $doctrine): Response{

        $entityManager = $doctrine->getManager();

        $ticket = new Tickets();   // On initialise notre entity

        $form = $this->createForm(TicketType::class, $ticket);

        $form->handleRequest($request);      // When the user submits the form, handleRequest() recognizes this and immediately writes the submitted data back into the entity(Tickets) and dueDate properties of the $task object. 

        if($form->isSubmitted()){

            $entityManager = $doctrine->getManager(); 

            $entityManager->persist($ticket);

            $entityManager->flush();

            return $this->redirectToRoute('tickets_list');

    
            // return new Response("Ticket creer avec succes");

        }

        return $this->renderForm('ticket/addTicket.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/editTicket/{id}', name:'ticket_edit')]
    public function editTicket(Request $request, ManagerRegistry $doctrine, Tickets $ticket): Response{

        $form = $this->createForm(TicketType::class, $ticket);

        $form->handleRequest($request);      // When the user submits the form, handleRequest() recognizes this and immediately writes the submitted data back into the entity(Tickets) and dueDate properties of the $task object. 

        if($form->isSubmitted()){

            $entityManager = $doctrine->getManager(); 

             $entityManager->flush();

            return $this->redirectToRoute('tickets_list');

    
            // return new Response("Ticket creer avec succes");

        }

        return $this->renderForm('ticket/addTicket.html.twig', [
            'form' => $form,
        ]);

    }

    #[Route('/deleteTicket/{id}', name:'ticket_delete')]
    public function deleteTicket(ManagerRegistry $doctrine, Tickets $ticket){

        $entityManager = $doctrine->getManager();

        $entityManager->remove($ticket);

        $entityManager->flush();

        return $this->redirectToRoute('tickets_list');


    }

   
}


?>