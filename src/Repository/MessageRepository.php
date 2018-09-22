<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Message::class);
    }



    public function findNotDeletedReceivedMessageByUser($user)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.receiver = :user')
            ->setParameter('user',$user)
            ->andWhere('m.deletedByReceiver = false')
            ->orderBy('m.sentAt', 'DESC')
            ->getQuery()
        ;
    }


    public function findNotDeletedSentMessageByUser($user)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.sender = :user')
            ->setParameter('user',$user)
            ->andWhere('m.deletedBySender = false')
            ->orderBy('m.sentAt', 'DESC')
            ->getQuery()
        ;
    }

    public function countNotReadMessageByUser($user)
    {
        return $this->createQueryBuilder('m')
            ->select('count(m.id)')
            ->andWhere('m.receiver = :user')
            ->andWhere('m.readByReceiver = false')
            ->andWhere('m.deletedByReceiver = false')
            ->setParameter('user',$user)
            ->getQuery()
            ->getSingleScalarResult()
            ;
    }


//    /**
//     * @return Message[] Returns an array of Message objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Message
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
