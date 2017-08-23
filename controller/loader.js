/* global __GLOBALAPP */

__GLOBALAPP.run ( function ( $rootScope ) {
    $rootScope.$on ( '$stateChangeStart' ,
            function ( event , toState , toParams , fromState , fromParams ) {
                $ ( ".myLoader" ).html ( "" ) ;
                $ ( ".page-loading" ).removeClass ( "hidden" ) ;
            } ) ;
    $rootScope.$on ( '$stateChangeSuccess' ,
            function ( event , toState , toParams , fromState , fromParams ) {
                $ ( ".page-loading" ).addClass ( "hidden" ) ;
            } ) ;
} ) ;

__GLOBALAPP.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
});

