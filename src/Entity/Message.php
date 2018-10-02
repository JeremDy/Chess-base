<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="sentMessages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $sender;

    /**
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="receivedMessages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $receiver;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=250)
     */
    private $title;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="text")
     */
    private $body;

    /**
     * @ORM\Column(type="datetime")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $deletedBySender;

    /**
     * @ORM\Column(type="boolean")
     */
    private $deletedByReceiver;

    /**
     * @ORM\Column(type="boolean")
     */
    private $readByReceiver;


    public function __toString()
    {
        return $this->title;
    }

    public function __construct()
    {
        $this->deletedByReceiver = false;
        $this->deletedBySender = false;
        $this->readByReceiver = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getReceiver(): ?User
    {
        return $this->receiver;
    }

    public function setReceiver(?User $receiver): self
    {
        $this->receiver = $receiver;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getDeletedBySender(): ?bool
    {
        return $this->deletedBySender;
    }

    public function setDeletedBySender(bool $deletedBySender): self
    {
        $this->deletedBySender = $deletedBySender;

        return $this;
    }

    public function getDeletedByReceiver(): ?bool
    {
        return $this->deletedByReceiver;
    }

    public function setDeletedByReceiver(bool $deletedByReceiver): self
    {
        $this->deletedByReceiver = $deletedByReceiver;

        return $this;
    }

    public function getReadByReceiver(): ?bool
    {
        return $this->readByReceiver;
    }

    public function setReadByReceiver(bool $readByReceiver): self
    {
        $this->readByReceiver = $readByReceiver;

        return $this;
    }
}
