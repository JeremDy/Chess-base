<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Game", mappedBy="PlayerOne")
     */
    private $IsWhiteInGame;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Game", mappedBy="PlayerTwo")
     */
    private $IsBlackInGame;

    public function __construct()
    {
        parent::__construct();
        $this->IsInGame = new ArrayCollection();
        $this->IsBlackInGame = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Game[]
     */
    public function getIsWhiteInGame(): Collection
    {
        return $this->IsWhiteInGame;
    }

    public function addIsWhiteInGame(Game $isInGame): self
    {
        if (!$this->IsWhiteInGame->contains($IsWhiteInGame)) {
            $this->IsWhiteInGame[] = $IsWhiteInGame;
            $IsWhiteInGame->setPlayerOne($this);
        }

        return $this;
    }

    public function removeIsWhiteInGame(Game $IsWhiteInGame): self
    {
        if ($this->IsWhiteInGame->contains($IsWhiteInGame)) {
            $this->IsWhiteInGame->removeElement($IsWhiteInGame);
            // set the owning side to null (unless already changed)
            if ($IsWhiteInGame->getPlayerOne() === $this) {
                $IsWhiteInGame->setPlayerOne(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Game[]
     */
    public function getIsBlackInGame(): Collection
    {
        return $this->IsBlackInGame;
    }

    public function addIsBlackInGame(Game $isBlackInGame): self
    {
        if (!$this->IsBlackInGame->contains($isBlackInGame)) {
            $this->IsBlackInGame[] = $isBlackInGame;
            $isBlackInGame->setPlayerTwo($this);
        }

        return $this;
    }

    public function removeIsBlackInGame(Game $isBlackInGame): self
    {
        if ($this->IsBlackInGame->contains($isBlackInGame)) {
            $this->IsBlackInGame->removeElement($isBlackInGame);
            // set the owning side to null (unless already changed)
            if ($isBlackInGame->getPlayerTwo() === $this) {
                $isBlackInGame->setPlayerTwo(null);
            }
        }

        return $this;
    }
}
