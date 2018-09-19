<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameRepository")
 */
class Game
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="object", nullable=true)
     */
    private $ChessBoard = [];

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $MovementList = [];

    /**
     * @ORM\Column(type="datetime")
     */
    private $StartedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="IsInGame")
     */
    private $PlayerOne;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="IsBlackInGame")
     */
    private $PlayerTwo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $PlayerWhoCanPlay;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $LastMove;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $LastMoveTime;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChessBoard(): ?object
    {
        return $this->ChessBoard;
    }

    public function setChessBoard(?object $ChessBoard): self
    {
        $this->ChessBoard = $ChessBoard;

        return $this;
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

    public function getStartedAt(): ?\DateTimeInterface
    {
        return $this->StartedAt;
    }

    public function setStartedAt(\DateTimeInterface $StartedAt): self
    {
        $this->StartedAt = $StartedAt;

        return $this;
    }

    public function getPlayerOne(): ?User
    {
        return $this->PlayerOne;
    }

    public function setPlayerOne(?User $PlayerOne): self
    {
        $this->PlayerOne = $PlayerOne;

        return $this;
    }

    public function getPlayerTwo(): ?User
    {
        return $this->PlayerTwo;
    }

    public function setPlayerTwo(?User $PlayerTwo): self
    {
        $this->PlayerTwo = $PlayerTwo;

        return $this;
    }

    public function getPlayerWhoCanPlay(): ?User
    {
        return $this->PlayerWhoCanPlay;
    }

    public function setPlayerWhoCanPlay(?User $PlayerWhoCanPlay): self
    {
        $this->PlayerWhoCanPlay = $PlayerWhoCanPlay;

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

    public function getLastMoveTime(): ?\DateTimeInterface
    {
        return $this->LastMoveTime;
    }

    public function setLastMoveTime(?\DateTimeInterface $LastMoveTime): self
    {
        $this->LastMoveTime = $LastMoveTime;

        return $this;
    }
}
