<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }


    public function findAllUserByNbWin()
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.stats', 's')
            ->orderBy('s.NbWin', 'DESC')
            ->getQuery()
        ;
    }

    public function findAllUserByNbLose()
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.stats', 's')
            ->orderBy('s.NbLose', 'DESC')
            ->getQuery()
        ;
    }

    public function findAllUserByNbGame()
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.stats', 's')
            ->orderBy('s.NbGame', 'DESC')
            ->getQuery()
        ;
    }

    public function findAllUserByName()
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.stats', 's')
            ->orderBy('u.username', 'ASC')
            ->getQuery()
        ;
    }

    public function findNotFriend($userId)
    {

        $rsm = new ResultSetMappingBuilder($this->getEntityManager());
        $rsm->addRootEntityFromClassMetadata('App\Entity\User', 'user');
        $selectClause = $rsm->generateSelectClause([ 'user' => 'user' ]);

        $query = $this->getEntityManager()->createNativeQuery('SELECT * 
        FROM user u 
        WHERE u.id != :userId 
        AND NOT EXISTS (
             SELECT 1 
             FROM friends 
             WHERE friends.friend_user_id = u.id 
             AND friends.user_id = :userId)', $rsm)
            ->setParameter('userId', $userId);
        $users = $query->getResult();
        return $users;
    }






    

//    /**
//     * @return User[] Returns an array of User objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
