<?php
// src/Entity/Article.php
namespace App\Entity;

class Article
{
    private $author;
    private $content;
    private $title;

    public function getAuthor()
    {
        return $this->author;
    }

    public function setAuthor($author)
    {
        $this->author = $author;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function setContent($Content)
    {
        $this->Content = $Content;
    }


    // ...
}

