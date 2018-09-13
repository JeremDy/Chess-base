<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @ORM\Column(type="array", nullable=true)
     */
    private $MovementList = [];

    /**
     * @ORM\Column(type="datetime")
     */
    private $StartedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PlayerInGame", mappedBy="game")
     */
    private $Players;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $ChessBoard = [];

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $EndedAt;

    public function __construct()
    {
        $this->Players = new ArrayCollection();
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

    public function getStartedAt(): ?\DateTimeInterface
    {
        return $this->StartedAt;
    }

    public function setStartedAt(\DateTimeInterface $StartedAt): self
    {
        $this->StartedAt = $StartedAt;

        return $this;
    }

    /**
     * @return Collection|PlayerInGame[]
     */
    public function getPlayers(): Collection
    {
        return $this->Players;
    }

    public function addPlayer(PlayerInGame $player): self
    {
        if (!$this->Players->contains($player)) {
            $this->Players[] = $player;
            $player->setGame($this);
        }

        return $this;
    }

    public function removePlayer(PlayerInGame $player): self
    {
        if ($this->Players->contains($player)) {
            $this->Players->removeElement($player);
            // set the owning side to null (unless already changed)
            if ($player->getGame() === $this) {
                $player->setGame(null);
            }
        }

        return $this;
    }

    public function getChessBoard(): ?array
    {
        return $this->ChessBoard;
    }

    public function setChessBoard(?array $ChessBoard): self
    {
        $this->ChessBoard = $ChessBoard;

        return $this;
    }

    public function getEndedAt(): ?TimeInterface
    {
        return $this->EndedAt;
    }

    public function setEndedAt(?\TimeInterface $EndedAt): self
    {
        $this->EndedAt = $EndedAt;

        return $this;
    }
}
