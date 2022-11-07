<?php
// src/Controller/LuckyController.php
namespace App\Controller;  // App correspond a src 

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/lucky')]
class LuckyController extends AbstractController
{
    #[Route('/number/{max}', name: "lucky_number_max")]   // on dit la qu'apres "number" on a une variable | On donne egalement un nom a la route
    public function number(int $max): Response
    {
        // dd($max);

        $number = random_int(0, $max);

        return $this->render('lucky/number.html.twig', [
            'number' => $number,
        ]);
    }

    #[Route('/index')]

    public function index(): Response
{
    // retrieve the object from database
    $product = $_GET['id'];
    if ($product) {
        // throw $this->createNotFoundException('The product does not exist');

    return $this->render('errors/error.html.twig');


        // the above is just a shortcut for:
        // throw new NotFoundHttpException('The product does not exist');
    }

    // return $this->render('errors/error.html.twig');
}
}