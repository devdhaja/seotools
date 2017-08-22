/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global __GLOBALAPP */

__GLOBALAPP.config ( function ( $stateProvider , $urlRouterProvider , $locationProvider ) {
    $urlRouterProvider.otherwise ( '/404' ) ;
    $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state ( "404" , {
                url : "/404" ,
                templateUrl : "view/404.html" ,
                controller : "homePageController"
            } )
            .state ( "/" , {
                url : "/" ,
                templateUrl : "view/home.html" ,
                controller : "homePageController"
            } )
            .state ( "/home" , {
                url : "/home" ,
                templateUrl : "view/home.html" ,
                controller : "homePageController"
            } )
            .state ( "/add-website" , {
                url : "/add-website" ,
                templateUrl : "view/add-website.html" ,
                controller : "homePageController"
            } )
            .state ( "/all-website" , {
                url : "/all-website" ,
                templateUrl : "view/all-website.html" ,
                controller : "homePageController"
            } )
            .state ( "/view-project" , {
                url : "/view-project" ,
                templateUrl : "view/view-project.html" ,
                controller : "homePageController"
            } )
            .state ( "/profile" , {
                url : "/profile" ,
                templateUrl : "view/profile.html" ,
                controller : "homePageController"
            } )
            .state ( "/change-password" , {
                url : "/change-password" ,
                templateUrl : "view/change-password.html" ,
                controller : "homePageController"
            } )
            .state ( "/post-blog" , {
                url : "/post-blog" ,
                templateUrl : "view/post-blog.html" ,
                controller : "homePageController"
            } ) ;

    $locationProvider.html5Mode ( true ) ;
} ) ;


/**
 * @params {object} 
 * @return null
 * @method Configuration 
 * @description This function set api configuration 
 */

__GLOBALAPP.config ( function ( $httpProvider ) {
    $httpProvider.defaults.headers.common = { } ;
    $httpProvider.defaults.headers.post = { } ;
    $httpProvider.defaults.headers.put = { } ;
    $httpProvider.defaults.headers.patch = { } ;
} ) ;