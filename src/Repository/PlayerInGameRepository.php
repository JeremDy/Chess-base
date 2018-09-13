<?php

namespace App\Repository;

use App\Entity\PlayerInGame;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method PlayerInGame|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlayerInGame|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlayerInGame[]    findAll()
 * @method PlayerInGame[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlayerInGameRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PlayerInGame::class);
    }

//    /**
//     * @return PlayerInGame[] Returns an array of PlayerInGame objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PlayerInGame
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
