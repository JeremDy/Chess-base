<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ArticleRepository")
 */
class Article
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $body;

    /**
     * @ORM\Column(type="datetime")
     */
    private $publishAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="articles")
     * @ORM\JoinColumn(nullable=false)
     */
    private $author;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ArticleAnswer", mappedBy="article", orphanRemoval=true)
     */
    private $articleAnswers;

    
    public function __toString()
    {
        return $this->title;
    }


    public function __construct()
    {
        $this->articleAnswers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPublishAt(): ?\DateTimeInterface
    {
        return $this->publishAt;
    }

    public function setPublishAt(\DateTimeInterface $publishAt): self
    {
        $this->publishAt = $publishAt;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return Collection|ArticleAnswer[]
     */
    public function getArticleAnswers(): Collection
    {
        return $this->articleAnswers;
    }

    public function addArticleAnswer(ArticleAnswer $articleAnswer): self
    {
        if (!$this->articleAnswers->contains($articleAnswer)) {
            $this->articleAnswers[] = $articleAnswer;
            $articleAnswer->setArticle($this);
        }

        return $this;
    }

    public function removeArticleAnswer(ArticleAnswer $articleAnswer): self
    {
        if ($this->articleAnswers->contains($articleAnswer)) {
            $this->articleAnswers->removeElement($articleAnswer);
            // set the owning side to null (unless already changed)
            if ($articleAnswer->getArticle() === $this) {
                $articleAnswer->setArticle(null);
            }
        }

        return $this;
    }
}