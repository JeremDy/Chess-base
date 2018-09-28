<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameOverRepository")
 */
class GameOver
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $MovementList = [];

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $Duration;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $Opponent;

    /**
     * @ORM\Column(type="boolean")
     */
    private $IsWinner;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="gameOvers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $player;

    public function __construct()
    {
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMovementList(): ?array
    {
        return $this->MovementList;
    }

    public function setMovementList(?array $MovementList): self
    {
        $this->MovementList = $MovementList;

        return $this;
    }

    public function getDuration(): ?\DateTimeInterface
    {
        return $this->Duration;
    }

    public function setDuration(?\DateTimeInterface $Duration): self
    {
        $this->Duration = $Duration;

        return $this;
    }


    public function getOpponent(): ?User
    {
        return $this->Opponent;
    }

    public function setOpponent(?User $Opponent): self
    {
        $this->Opponent = $Opponent;

        return $this;
    }

    public function getIsWinner(): ?bool
    {
        return $this->IsWinner;
    }

    public function setIsWinner(bool $IsWinner): self
    {
        $this->IsWinner = $IsWinner;

        return $this;
    }

    public function getPlayer(): ?User
    {
        return $this->player;
    }

    public function setPlayer(?User $player): self
    {
        $this->player = $player;

        return $this;
    }
}
