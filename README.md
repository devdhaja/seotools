# seotools

SEO Tool is utility for insert keyword meta description, tittle on web page witth very easly.Using  this utility user can track website trafic 
click and trafic by country, view by country. And  user can track the compromisse status using this utility. this utility provide last visited ip
location and google map.

How to usse? 

Clone code from this repository and create database.

Change the configuration: 

Open Api/classes/config.php

<pre>
define( 'HOST' , "sql12.freemysqlhosting.net" );   //database host
define( 'DB' , "sql12191143" );   // Database name
define( 'USER' , "sql12191143" );   // Usser name 
define( 'PASSWORD' , "RhRp5FPrYs" ); // Database paassword
define( 'KEY' , "devrajverma" );   // Secreat key for encrypt you information
define( 'URL' , "https://demoseotools.herokuapp.com/" );  // url of utility where you want to install it.
</pre>


open controller/config.js
<pre>
var __BASE_URL = "https://demoseotools.herokuapp.com/api/";  //change your api url
</pre>

Import database : 

open database/db.sql
<pre>
    Open phpmyadmin
    Create database 
    import db.sql.
</pre>

Change user name email password and other admin details---

<pre>
  Open user table in database and modified it.
</pre>






