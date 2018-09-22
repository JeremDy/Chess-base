<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;

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

        /** @ORM\Column(name="facebook_id", type="string", length=255, nullable=true) */
        protected $facebook_id;
        /** @ORM\Column(name="facebook_access_token", type="string", length=255, nullable=true) */
        protected $facebook_access_token;
        /** @ORM\Column(name="google_id", type="string", length=255, nullable=true) */
        protected $google_id;
        /** @ORM\Column(name="google_access_token", type="string", length=255, nullable=true) */
        protected $google_access_token;
    
        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         * 
         * @Assert\File(mimeTypes={ "image/jpeg", "image/png" })
         */
        private $profilePicture;

        /**
         * @ORM\Column(type="datetime")
         */
        private $FirstLogin;

    public function __construct()
    {
        parent::__construct();
        $this->IsInGame = new ArrayCollection();
        $this->IsBlackInGame = new ArrayCollection();
        $this->IsWhiteInGame = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
       
    public function getProfilePicture()
    {
        return $this->profilePicture;
    }

    public function setProfilePicture($profilePicture): self
    {
        $this->profilePicture = $profilePicture;
        return $this;
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

    public function getFirstLogin(): ?\DateTimeInterface
    {
        return $this->FirstLogin;
    }

    public function setFirstLogin(\DateTimeInterface $FirstLogin): self
    {
        $this->FirstLogin = $FirstLogin;

        return $this;
    }

    public function getFacebookId(): ?string
    {
        return $this->facebook_id;
    }

    public function setFacebookId(?string $facebook_id): self
    {
        $this->facebook_id = $facebook_id;

        return $this;
    }

    public function getFacebookAccessToken(): ?string
    {
        return $this->facebook_access_token;
    }

    public function setFacebookAccessToken(?string $facebook_access_token): self
    {
        $this->facebook_access_token = $facebook_access_token;

        return $this;
    }

    public function getGoogleId(): ?string
    {
        return $this->google_id;
    }

    public function setGoogleId(?string $google_id): self
    {
        $this->google_id = $google_id;

        return $this;
    }

    public function getGoogleAccessToken(): ?string
    {
        return $this->google_access_token;
    }

    public function setGoogleAccessToken(?string $google_access_token): self
    {
        $this->google_access_token = $google_access_token;

        return $this;
    }
}
