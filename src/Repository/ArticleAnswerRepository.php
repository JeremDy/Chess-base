<?php

namespace App\Repository;

use App\Entity\ArticleAnswer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ArticleAnswer|null find($id, $lockMode = null, $lockVersion = null)
 * @method ArticleAnswer|null findOneBy(array $criteria, array $orderBy = null)
 * @method ArticleAnswer[]    findAll()
 * @method ArticleAnswer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleAnswerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ArticleAnswer::class);
    }

    public function findAllArticleAnswerByArticleByDate($article)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.article = :article')
            ->setParameter('article',$article)
            ->orderBy('a.publishAt', 'DESC')
            ->getQuery()
        ;
    }

//    /**
//     * @return ArticleAnswer[] Returns an array of ArticleAnswer objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ArticleAnswer
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
