<?php

namespace App\Entity;

use App\Repository\StartedRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StartedRepository::class)]
class Started
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $tab1 = null;

    #[ORM\Column]
    private ?int $price = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTab1(): ?string
    {
        return $this->tab1;
    }

    public function setTab1(string $tab1): self
    {
        $this->tab1 = $tab1;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }
}
