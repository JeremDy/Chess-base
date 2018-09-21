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

        /**
         * @ORM\OneToMany(targetEntity="App\Entity\Message", mappedBy="sender")
         */
        private $sentMessages;

        /**
         * @ORM\OneToMany(targetEntity="App\Entity\Message", mappedBy="receiver")
         */
        private $receivedMessages;

    public function __construct()
    {
        parent::__construct();
        $this->IsInGame = new ArrayCollection();
        $this->IsBlackInGame = new ArrayCollection();
        $this->FirstLogin = new \DateTime();
        $this->sentMessages = new ArrayCollection();
        $this->receivedMessages = new ArrayCollection();
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

    /**
     * @return Collection|Message[]
     */
    public function getSentMessages(): Collection
    {
        return $this->sentMessages;
    }

    public function addSentMessage(Message $sentMessage): self
    {
        if (!$this->sentMessages->contains($sentMessage)) {
            $this->sentMessages[] = $sentMessage;
            $sentMessage->setSender($this);
        }

        return $this;
    }

    public function removeSentMessage(Message $sentMessage): self
    {
        if ($this->sentMessages->contains($sentMessage)) {
            $this->sentMessages->removeElement($sentMessage);
            // set the owning side to null (unless already changed)
            if ($sentMessage->getSender() === $this) {
                $sentMessage->setSender(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getReceivedMessages(): Collection
    {
        return $this->receivedMessages;
    }

    public function addReceivedMessage(Message $receivedMessage): self
    {
        if (!$this->receivedMessages->contains($receivedMessage)) {
            $this->receivedMessages[] = $receivedMessage;
            $receivedMessage->setReceiver($this);
        }

        return $this;
    }

    public function removeReceivedMessage(Message $receivedMessage): self
    {
        if ($this->receivedMessages->contains($receivedMessage)) {
            $this->receivedMessages->removeElement($receivedMessage);
            // set the owning side to null (unless already changed)
            if ($receivedMessage->getReceiver() === $this) {
                $receivedMessage->setReceiver(null);
            }
        }

        return $this;
    }
}
