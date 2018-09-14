<?php

/* main/header.html.twig */
class __TwigTemplate_9b3b6fe93759d73001d2008fcb0a35c3da5e5274874005e74a331c04d7bef7d7 extends Twig_Template
{
    private $source;

    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = array(
            'header' => array($this, 'block_header'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "main/header.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "main/header.html.twig"));

        // line 1
        echo "
 ";
        // line 2
        $this->displayBlock('header', $context, $blocks);
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    public function block_header($context, array $blocks = array())
    {
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "header"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "header"));

        // line 3
        echo "
 <header class=\"container\">
     <div class=\"d-flex\">
     <h1 class=\"col-8\">
         <a href=\"";
        // line 7
        echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("home");
        echo "\">Chess Online</a>
     </h1>
     <div class\"\">
     ";
        // line 10
        if ($this->extensions['Symfony\Bridge\Twig\Extension\SecurityExtension']->isGranted("IS_AUTHENTICATED_REMEMBERED")) {
            // line 11
            echo "                 ";
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("layout.logged_in_as", array("%username%" => twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new Twig_Error_Runtime('Variable "app" does not exist.', 11, $this->source); })()), "user", array()), "username", array())), "FOSUserBundle"), "html", null, true);
            echo " | 
                 <a class=\"\" href=\"";
            // line 12
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("fos_user_security_logout");
            echo "\">
                     ";
            // line 13
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("layout.logout", array(), "FOSUserBundle"), "html", null, true);
            echo "
                 </a>
     ";
        }
        // line 16
        echo "     </div>
     </div>
     <hr class=\"m-1\">
         <nav class=\"nav d-flex col-12\">
                     ";
        // line 20
        if ($this->extensions['Symfony\Bridge\Twig\Extension\SecurityExtension']->isGranted("IS_AUTHENTICATED_FULLY")) {
            // line 21
            echo "                         ";
            // line 22
            echo "                         <div class=\"col-10\">
                         <a class=\"nav-item nav-link\" href=\"";
            // line 23
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("fos_user_profile_show");
            echo "\">Mon Profil</a>
                         </div>
                     ";
        } else {
            // line 26
            echo "                     <div class=\"col-10\"></div>
                     <div class=\"d-inline col-2\">
                         ";
            // line 29
            echo "                         ";
            // line 30
            echo "                     </div>    
                     ";
        }
        // line 32
        echo "                     
          </nav>
 </header>
 ";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    public function getTemplateName()
    {
        return "main/header.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  109 => 32,  105 => 30,  103 => 29,  99 => 26,  93 => 23,  90 => 22,  88 => 21,  86 => 20,  80 => 16,  74 => 13,  70 => 12,  65 => 11,  63 => 10,  57 => 7,  51 => 3,  33 => 2,  30 => 1,);
    }

    public function getSourceContext()
    {
        return new Twig_Source("
 {% block header %}

 <header class=\"container\">
     <div class=\"d-flex\">
     <h1 class=\"col-8\">
         <a href=\"{{ path('home') }}\">Chess Online</a>
     </h1>
     <div class\"\">
     {% if is_granted(\"IS_AUTHENTICATED_REMEMBERED\") %}
                 {{ 'layout.logged_in_as'|trans({'%username%': app.user.username}, 'FOSUserBundle') }} | 
                 <a class=\"\" href=\"{{ path('fos_user_security_logout') }}\">
                     {{ 'layout.logout'|trans({}, 'FOSUserBundle') }}
                 </a>
     {% endif %}
     </div>
     </div>
     <hr class=\"m-1\">
         <nav class=\"nav d-flex col-12\">
                     {% if is_granted('IS_AUTHENTICATED_FULLY') %}
                         {# <a class=\"nav-item nav-link\" href=\"{{ path('logout') }}\">Déconnexion</a> #}
                         <div class=\"col-10\">
                         <a class=\"nav-item nav-link\" href=\"{{ path('fos_user_profile_show') }}\">Mon Profil</a>
                         </div>
                     {% else %}
                     <div class=\"col-10\"></div>
                     <div class=\"d-inline col-2\">
                         {# <a class=\"nav-item nav-link text-right\" href=\"{{ path('fos_user_security_login') }}\">Connexion/Inscription</a> #}
                         {# <a class=\"nav-item nav-link\" href=\"{{ path('fos_user_registration_register') }}\">Inscription</a> #}
                     </div>    
                     {% endif %}
                     
          </nav>
 </header>
 {% endblock %}", "main/header.html.twig", "/var/www/html/chess3/Chess-base/templates/main/header.html.twig");
    }
}
