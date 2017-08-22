<?php
session_start();
if ( !isset( $_SESSION[ 'admin' ] ) )
    header( "location:login.php" );
?>

<!DOCTYPE html>
<html lang="en" ng-app="homePageApp" ng-controller="homePageController">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="hello worlds,i am cool">
        <title>Traffic Tracker</title>
        <!--load main css -->
        <link href="css/main.css" rel="stylesheet">
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="css/font-awesome.min.css" rel="stylesheet">
        <!-- jQuery custom content scroller -->
        <link href="css/jquery.mCustomScrollbar.min.css" rel="stylesheet"/>
        <!-- Custom Theme Style -->
        <link href="css/custom.min.css" rel="stylesheet">
        <base href="https://demoseotools.herokuapp.com/"> 
			
		<style>
        .loading-spiner-holder {
            position: absolute;
            top: 10%;
            left: 50%;
            /* background: red; */
            z-index: 9999;
        }
    </style>
    </head>
    <body class="nav-md footer_fixed" style="display: none;" id="page">
        <div class="container body" id="overlay-back ">
            <div class="main_container">
                <div class="col-md-3 left_col menu_fixed">
                    <div class="left_col scroll-view">
                        <div class="navbar nav_title" style="border: 0;">
                            <a href="index.html" class="site_title"><i class="fa fa-send"></i> <span>Demo SEO  and Tracker</span></a>
                        </div>

                        <div class="clearfix"></div>
                        <!-- menu profile quick info -->
                        <div class="profile">
                            <div class="profile_pic">
                                <img ng-src="uploads/{{m.logo}}" alt="..." class="img-circle profile_img">
                            </div>
                            <div class="profile_info">
                                <span>Welcome,</span>
                                <h2> {{m.first_name}} {{m.last_name}}</h2>
                            </div>
                        </div>
                        <!-- /menu profile quick info -->
                        <br /><br /><br />
                        <!-- sidebar menu -->
                        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                            <div class="menu_section">
                                <h3><br><hr></h3>
                                <ul class="nav side-menu">
                                    <li><a href="home"><i class="fa fa-home"></i> Home </a></li>
                                    <li><a href="add-website"><i class="fa fa-globe"></i> Add Web sites </a></li>
                                    <li><a href="all-website"><i class="fa fa-globe"></i> All Web sites </a></li>
                                    <li><a href="profile"><i class="fa fa-cog"></i> Profile Setting </a></li>
                                    <!-- <li><a href="traffic-status"><i class="fa fa-train"></i> Traffic Status  </a></li>
                                     <li><a href="country-wise-status"><i class="fa fa-flag"></i> Country wise status </a></li>-->
                                    <li><a href="change-password"><i class="fa fa-cog"></i> Change Password </a></li>
                                </ul>
                            </div>

                        </div>
                        <!-- /sidebar menu -->
                        <!-- /menu footer buttons -->
                        <div class="sidebar-footer hidden-small">
                            <a href="profile" data-toggle="tooltip" data-placement="top" title="Settings">
                                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </a>
                            <a onclick="javascript:toggle_fullscreen();" data-toggle="tooltip" data-placement="top" title="FullScreen">
                                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                            </a>
                            <a ng-click="setLockScreen()" data-toggle="tooltip" data-placement="top" title="Lock">
                                <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                            </a>
                            <a onclick="window.location.href='api/logout'" data-toggle="tooltip" data-placement="top" title="Logout">
                                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                            </a>
                        </div>
                        <!-- /menu footer buttons -->
                    </div>
                </div>

                <!-- top navigation -->
                <div class="top_nav">
                    <div class="nav_menu">
                        <nav class="" role="navigation">
                            <div class="nav toggle">
                                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                            </div>
                            <ul class="nav navbar-nav navbar-right">
                                <li class="">
                                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                        <img ng-src="uploads/{{m.logo}}" alt="">{{m.first_name}} {{m.last_name}}
                                        <span class=" fa fa-angle-down"></span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                                        <li><a href="profile"> Profile</a></li>
                                        <li>
                                            <a href="change-password">
                                                <span>Change Password</span>
                                            </a>
                                        </li>
                 
                                        <li><a onclick="window.location.href='api/logout'"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
                <!-- /top navigation -->

                <!-- page content -->
                <div class="right_col" role="main">
                    <div class="">
                        <div id="content" class="myLoader" ui-view=""></div>
                    </div>
                </div>
                <!-- /page content -->

                <!-- footer content -->
                <footer>
                    <div class="pull-right">
                        &copy All right reserved <a href="#">Spear</a>
                    </div>
                    <div class="clearfix"></div>
                </footer>
                <!-- /footer content -->
            </div>
        </div>
        <div id="popup" ng-if="isLockOrNot()">
            <div class="close-image">
                <div class="col-md-4 col-md-offset-4" id="login">
                    <img ng-src="uploads/{{m.logo}}" alt="..." class="img-circle">
                    <h3 style="color: #000; text-align: center;">{{u.first_name}} {{u.last_name}}</h3>
                    <br>
                    <input type="password" class="form-control" id="pass">
                    <br>
                    <button ng-click="setUnlock()" class="btn btn-primary form-control">Unlock <i class="fa fa-unlock"></i></button>
                    <br>
                    <h5 style="color: red; text-align: center;">{{errorMessageOfLock}}</h5>
                </div>
            </div>
        </div>

        <!--
         Load all script here 
        -->

	
	
	   <!--end loader code here-->
    <div class="loading-spiner-holder" data-loading>
        <div class="loading-spiner"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" /></div>
    </div>
	
        <script src="controller/config.js"></script>
        <script src="js/angular.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js"></script>
        <script src="controller/home-page-clt.js"></script>
        <script src="controller/route.js"></script>

        <!-- jQuery -->
        <script src="js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="js/bootstrap.min.js"></script>
        <!-- FastClick -->
        <script src="js/fastclick.js"></script>
        <!-- NProgress -->
        <script src="js/nprogress.js"></script>
        <!-- jQuery custom content scroller -->
        <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
        <!--Charts script---->
        <script src="js/Chart.min.js"></script>

        <!-- Custom Theme Scripts -->
        <script src="js/custom.min.js"></script>

        <!-- Custom Chart Scripts -->
        <script src="controller/chart.js"></script>

        <!--movement js here -->
        <script src="js/time.js"></script>
        <!--Country wise details content here -->
        <script src="js/echarts.min.js"></script>
        <script src="js/world.js"></script>
        <script src="controller/country-traffic.js"></script>
		<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    </body>
</html>