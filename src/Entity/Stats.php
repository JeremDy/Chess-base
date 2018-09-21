<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\StatsRepository")
 */
class Stats
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", mappedBy="Id", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $Player;

    /**
     * @ORM\Column(type="integer")
     */
    private $NbWin;

    /**
     * @ORM\Column(type="integer")
     */
    private $NbGame;

    /**
     * @ORM\Column(type="integer")
     */
    private $NbLose;

    /**
     * @ORM\Column(type="integer")
     */
    private $NbSurrender;

    /**
     * @ORM\Column(type="time", nullable=true)
     */
    private $TotalTime;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer(): ?User
    {
        return $this->Player;
    }

    public function setPlayer(User $Player): self
    {
        $this->Player = $Player;

        return $this;
    }

    public function getNbWin(): ?int
    {
        return $this->NbWin;
    }

    public function setNbWin(int $NbWin): self
    {
        $this->NbWin = $NbWin;

        return $this;
    }

    public function getNbGame(): ?int
    {
        return $this->NbGame;
    }

    public function setNbGame(int $NbGame): self
    {
        $this->NbGame = $NbGame;

        return $this;
    }

    public function getNbLose(): ?int
    {
        return $this->NbLose;
    }

    public function setNbLose(int $NbLose): self
    {
        $this->NbLose = $NbLose;

        return $this;
    }

    public function getNbSurrender(): ?int
    {
        return $this->NbSurrender;
    }

    public function setNbSurrender(int $NbSurrender): self
    {
        $this->NbSurrender = $NbSurrender;

        return $this;
    }

    public function getTotalTime(): ?\DateTimeInterface
    {
        return $this->TotalTime;
    }

    public function setTotalTime(?\DateTimeInterface $TotalTime): self
    {
        $this->TotalTime = $TotalTime;

        return $this;
    }
}
