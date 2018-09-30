<?php

namespace App\Form;

use App\Entity\Article;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class ArticleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title',null,[
                'label' => 'Titre :'
            ])
            ->add('previewImage', FileType::class, array(
                'label' => 'Image de preview (Jpg/png) :', 
                'data_class' => null,
                'required' => false
            )) 
            ->add('extrait',null,[
                'label' => 'Extrait :'
            ])   
            ->add('body', CKEditorType::class,[
                'label' => 'Article :',              
            ])         
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Article::class,
        ]);
    }
}
