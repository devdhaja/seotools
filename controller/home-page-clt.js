/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global __BASE_URL */

var __GLOBALAPP = angular.module ( 'homePageApp' , [ 'ui.router' ] ) ;
__GLOBALAPP.controller ( 'homePageController' , function ( $scope , $http , $stateParams ) {
    /**
     * 
     */

    document.getElementById ( 'page' ).style.display = "block" ;
    /**
     * 
     * @returns {undefined}
     */
    $scope.getChartsData = function () {
        getChartsData ( [ 1 , 1 , 1 , 1 , 1 , 1 , 1 ] , [ 1 , 1 , 1 , 1 , 1 , 1 , 1 ] ) ;
    } ;

    /**
     * 
     * @returns {undefined}
     */

    function getUserDetails () {
        $http.get ( __BASE_URL + "getBaseUser" ).success ( function ( data ) {
            $scope.u = data.msg ;
            $scope.m = data.msg ;
            checkUserLock () ;
        } ) ;
    }
    getUserDetails () ;
    /**
     * @type (Object)
     */

    $scope.w = { url : "" , name : "" , status : true } ;
    /**
     * 
     * @returns {undefined}
     */
    $scope.addWebsite = function () {
        try {
            document.getElementById ( 'loader' ).style.display = "block" ;
            document.getElementById ( 'btn' ).disabled = true ;
            $http.post ( __BASE_URL + "saveWebsite" , $scope.w ).success ( function ( data ) {
                if ( data.status ) {
                    document.getElementById ( 'loader' ).style.display = "none" ;
                    document.getElementById ( 'btn' ).disabled = false ;
                    $scope.successMessage = data.msg ;
                    document.getElementById ( 'url' ).style.display = 'block' ;
                } else {
                    document.getElementById ( 'loader' ).style.display = "none" ;
                    document.getElementById ( 'btn' ).disabled = false ;
                    $scope.errorMessage = data.msg ;
                }
            } ) ;
        } catch ( err ) {
            console.log ( err ) ;
        }
    } ;
    /**
     * 
     * @returns {undefined}
     */
    $scope.getAllSiteData = function () {
        try {
            $http.get ( __BASE_URL + "getAllSites" ).success ( function ( data ) {
                if ( data.status ) {
                    $scope.allSites = data.msg ;
                }
            } ) ;
        } catch ( e ) {
            console.log ( e ) ;
        }
    } ;
    /**
     * 
     * @returns {None}
     */
    $scope.getThisProjectDetails = function () {
        var key = window.localStorage.getItem ( 'key' ) ;
        $http.post ( __BASE_URL + "getThisProject" , { key : key } ).success ( function ( data ) {
            if ( data.status ) {
                $scope.thisProject = data.msg ;
                trafficeByCountry ( data.msg.cviews ) ;
                trafficeByCountryForClick ( data.msg.cclicks ) ;
                getChartsData ( data.msg.tviews , data.msg.tclick ) ;
            }
        } ) ;
    } ;
    /**
     * 
     * @param {type} key
     * @returns {Array}
     */
    $scope.openThisPage = function ( key ) {
        window.localStorage.setItem ( 'key' , key ) ;
        window.location.href = "view-project" ;
    } ;

    /**
     * @type (Object)
     */
    $scope.e = { url : "" , keywords : "" , description : "" , id : "" , index : "" } ;
    $scope.updateUserKeyWords = function ( keywords , title , description , url , id , index ) {
        $scope.e = { url : url , keywords : keywords , description : description , id : id , title : title , index : index } ;
    } ;

    /**
     * 
     * @returns {None}
     */

    $scope.updateKeyWords = function () {
        $scope.successError = "" ;
        if ( typeof $scope.e.keywords === "string" ) {
            $scope.e.keywords = $scope.e.keywords.split ( "," ) ;
        }
        if ( typeof $scope.e.description === "string" ) {
            $scope.e.description = $scope.e.description.split ( "," ) ;
        }

        $http.post ( __BASE_URL + "updateKeyWords" , $scope.e ).success ( function ( data ) {
            if ( data.status ) {
                $scope.successMessage = data.msg ;
                $scope.thisProject.pages[$scope.e.index].keywords = $scope.e.keywords ;
                $scope.thisProject.pages[$scope.e.index].title = $scope.e.title ;
                $scope.thisProject.pages[$scope.e.index].description = $scope.e.description ;
            }
        } ) ;
    } ;
    /**
     * 
     * @returns {Array}
     */
    $scope.upadateProfile = function () {
        var fd = new FormData () ;
        fd.append ( "first_name" , $scope.u.first_name ) ;
        fd.append ( "last_name" , $scope.u.last_name ) ;
        fd.append ( "id" , $scope.u.id ) ;
        var file = document.getElementById ( 'profile' ).files[0] ;
        fd.append ( "logo" , file ) ;
        $http.post ( __BASE_URL + "upadateProfile" , fd ).success ( function ( data ) {
            if ( data.status ) {
                $scope.successMessage = data.msg ;
                getUserDetails () ;
            }
        } ) ;
    } ;

    /**
     * 
     * @type Boolean
     */
    var lock = false ;

    $scope.setLockScreen = function () {
        $http.post ( __BASE_URL + "setLockStatus" , { id : $scope.u.id } ).success ( function ( data ) {
            if ( data.status ) {
                lock = true ;
            }
        } ) ;
    } ;
    /**
     * 
     * @returns {Boolean}
     */
    function checkUserLock () {
        $http.post ( __BASE_URL + "getLockStatus" , { id : $scope.u.id } ).success ( function ( data ) {
            if ( data.status ) {
                lock = true ;
            }
        } ) ;
    }


    /**
     * 
     * @returns {Boolean}
     */

    $scope.isLockOrNot = function () {
        return lock ;
    } ;
    /**
     * 
     * @returns {Boolean}
     */
    $scope.setUnlock = function () {
        var pass = document.getElementById ( 'pass' ).value ;
        $http.post ( __BASE_URL + "setUnlock" , { id : $scope.u.id , password : pass } ).success ( function ( data ) {
            if ( data.status ) {
                lock = false ;
            } else {
                $scope.errorMessageOfLock = data.msg ;
            }
        } ) ;
    } ;
    /**
     * 
     * @returns {Boolean}
     */
    $scope.changePassword = function () {
        if ( $scope.newp !== $scope.conp ) {
            $scope.errorMessage = "New password and confirm is not match" ;
            return false ;
        }
        $http.post ( __BASE_URL + "changePassword" , { oldp : $scope.oldp , newp : $scope.newp , id : $scope.u.id } ).success ( function ( data ) {
            if ( data.status ) {
                $scope.successMessage = data.msg ;
            } else {
                $scope.errorMessage = data.msg ;
            }
        } ) ;
    } ;

    /**
     * 
     * @returns {Array}
     */

    $scope.loadHomePageData = function () {
        $http.get ( __BASE_URL + "loadHomePageData" ).success ( function ( data ) {
            if ( data.status ) {
                $scope.homeRes = data.msg ;
                getChartsData ( data.msg.view , data.msg.click ) ;
            }
        } ) ;
    } ;
    /**
     * 
     * @param {type} id
     * @returns {Array}
     */
    $scope.deleteThisProject = function ( id ) {
        var is = window.confirm ( "Do you want to delete it ?" )
        if ( is )
            $http.post ( __BASE_URL + "deleteThisProject" , { id : id } ).success ( function ( data ) {
                if ( data.status ) {
                    $scope.getAllSiteData () ;
                }
            } ) ;
    } ;
    /**
     * 
     * @param {type} loc
     * @returns {Array}
     */
    $scope.openGoogleMap = function ( loc ) {
        var l = loc.split ( ',' ) ;
        var url = "https://www.google.co.in/maps/search/search+by+lat+and+long+only/@" + l[0] + "," + l[1] + ",21z" ;
        var win = window.open ( url , '_blank' ) ;
        win.focus () ;
    } ;
} ) ;

/**
 * 
 * @param {Array} param1
 * @param {Array} param2
 */

__GLOBALAPP.filter ( 'moment' , [
    function () {
        return function ( date , method ) {
            var momented = moment ( date ) ;
            return momented[method].apply ( momented , Array.prototype.slice.call ( arguments , 2 ) ) ;
        } ;
    }
] ) ;

/**
 * 
 * @returns {Null}
 */
function toggle_fullscreen () {
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled ;
    if ( fullscreenEnabled ) {
        if ( ! document.fullscreenElement && ! document.mozFullScreenElement && ! document.webkitFullscreenElement && ! document.msFullscreenElement ) {
            launchIntoFullscreen ( document.documentElement ) ;
        } else {
            exitFullscreen () ;
        }
    }
}
/**
 * 
 * @param {type} element
 * @returns {Bloolean}
 */
function launchIntoFullscreen ( element ) {
    if ( element.requestFullscreen ) {
        element.requestFullscreen () ;
    } else if ( element.mozRequestFullScreen ) {
        element.mozRequestFullScreen () ;
    } else if ( element.webkitRequestFullscreen ) {
        element.webkitRequestFullscreen () ;
    } else if ( element.msRequestFullscreen ) {
        element.msRequestFullscreen () ;
    }
}
/**
 * 
 * @returns {Boolean}
 */
function exitFullscreen () {
    if ( document.exitFullscreen ) {
        document.exitFullscreen () ;
    } else if ( document.mozCancelFullScreen ) {
        document.mozCancelFullScreen () ;
    } else if ( document.webkitExitFullscreen ) {
        document.webkitExitFullscreen () ;
    }
}



    __GLOBALAPP.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);