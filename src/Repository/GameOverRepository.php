<?php

namespace App\Repository;

use App\Entity\GameOver;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method GameOver|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameOver|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameOver[]    findAll()
 * @method GameOver[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameOverRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, GameOver::class);
    }

//    /**
//     * @return GameOver[] Returns an array of GameOver objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?GameOver
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
