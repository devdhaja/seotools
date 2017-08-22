<?php
session_start();
require_once'Slim/Slim.php';
include_once 'classes/config.php';
include_once 'classes/logic.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->post( "/saveWebsite" , "saveWebsite" );
$app->post( "/setUrlStatus" , "setUrlStatus" );
$app->get( "/getAllSites" , "getAllSites" );
$app->post( "/getThisProject" , "getThisProject" );
$app->post( "/updateKeyWords" , "updateKeyWords" );
$app->post( "/getCurrentMetaForThisPage" , "getCurrentMetaForThisPage" );
$app->post( "/setUserCompleatTrackingDetails" , "setUserCompleatTrackingDetails" );
$app->get( "/getBaseUser" , "getBaseUser" );
$app->post( "/upadateProfile" , "upadateProfile" );
$app->post( "/setLockStatus" , "setLockStatus" );
$app->post( "/setUnlock" , "setUnlock" );
$app->post( "/getLockStatus" , "getLockStatus" );
$app->post( "/changePassword" , "changePassword" );
$app->get( "/loadHomePageData" , "loadHomePageData" );
$app->post( "/deleteThisProject" , "deleteThisProject" );
$app->post( "/login" , "login" );
$app->get( "/logout" , "logout" );

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


function saveWebsite()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->saveWebsite( $data );
}

function setUrlStatus()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->setUrlStatus( $data );
}

function getAllSites()
{
    $call = new logic();
    $call->getAllSites();
}

function getThisProject()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->getThisProject( $data );
}

function updateKeyWords()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->updateKeyWords( $data );
}

function getCurrentMetaForThisPage()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->getCurrentMetaForThisPage( $data );
}

function setUserCompleatTrackingDetails()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->setUserCompleatTrackingDetails( $data );
}

function getBaseUser()
{
    $call = new logic();
    $call->getBaseUser();
}

function upadateProfile()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = $request->post();
    $call    = new logic();
    $logo    = "";
    if ( isset( $_FILES[ 'logo' ] ) )
    {
        $logo = $_FILES[ 'logo' ];
    }

    $call->upadateProfile( $data , $logo );
}

function setLockStatus()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->setLockStatus( $data );
}

function setUnlock()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->setUnlock( $data );
}

function getLockStatus()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->getLockStatus( $data );
}

function changePassword()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->changePassword( $data );
}

function loadHomePageData()
{
    $call = new logic();
    $call->loadHomePageData();
}

function deleteThisProject()
{
    $request = \Slim\Slim::getInstance()->request();
    $data    = json_decode( $request->getBody() );
    $call    = new logic();
    $call->deleteThisProject( $data );
}

function login()
{
    $_SESSION['admin'] = 2;
    echo "<script>window.location.href='../home'</script>";
}

function logout()
{
    session_destroy();
    echo "<script>window.location.href='../index.php'</script>";
}

$app->run();


