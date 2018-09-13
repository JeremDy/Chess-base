<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PlayerInGameRepository")
 */
class PlayerInGame
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $Player;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $LastMoveTime;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $LastMove;

    /**
     * @ORM\Column(type="boolean")
     */
    private $AllowToMove;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $Opponent;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Game", inversedBy="Players")
     * @ORM\JoinColumn(nullable=false)
     */
    private $game;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Game")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Game;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer(): ?User
    {
        return $this->Player;
    }

    public function setPlayer(?User $Player): self
    {
        $this->Player = $Player;

        return $this;
    }

    public function getLastMoveTime(): ?\DateTimeInterface
    {
        return $this->LastMoveTime;
    }

    public function setLastMoveTime(?\DateTimeInterface $LastMoveTime): self
    {
        $this->LastMoveTime = $LastMoveTime;

        return $this;
    }

    public function getLastMove(): ?string
    {
        return $this->LastMove;
    }

    public function setLastMove(?string $LastMove): self
    {
        $this->LastMove = $LastMove;

        return $this;
    }

    public function getAllowToMove(): ?bool
    {
        return $this->AllowToMove;
    }

    public function setAllowToMove(bool $AllowToMove): self
    {
        $this->AllowToMove = $AllowToMove;

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

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }
}
