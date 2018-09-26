<?php

namespace App\Form;

use App\Entity\ArticleAnswer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use FOS\CKEditorBundle\Form\Type\CKEditorType;

class ArticleAnswerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('body', CKEditorType::class,[
            'label' => 'Nouveau commentaire :',
            'config' =>[
                'toolbar' => 'basic'
            ]
          
        ])     
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ArticleAnswer::class,
        ]);
    }
}
