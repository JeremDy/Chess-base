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
     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="gameOverPlayer")
     */
    private $Player;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     */
    private $Opponent;

    /**
     * @ORM\Column(type="boolean")
     */
    private $IsWinner;

    public function __construct()
    {
        $this->Player = new ArrayCollection();
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

    /**
     * @return Collection|User[]
     */
    public function getPlayer(): Collection
    {
        return $this->Player;
    }

    public function addPlayer(User $player): self
    {
        if (!$this->Player->contains($player)) {
            $this->Player[] = $player;
            $player->setGameOverPlayer($this);
        }

        return $this;
    }

    public function removePlayer(User $player): self
    {
        if ($this->Player->contains($player)) {
            $this->Player->removeElement($player);
            // set the owning side to null (unless already changed)
            if ($player->getGameOverPlayer() === $this) {
                $player->setGameOverPlayer(null);
            }
        }

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
}
