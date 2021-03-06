<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of logic
 *
 * @author server
 */
class logic extends config
{

    public function saveWebsite( $data )
    {
        $data                = ( object ) $this->clearData( ( array ) $data );
        $data->ip            = $this->getUserIpAddress();
        $data->date_and_time = $this->createTimeStamp()->date;
        $data->created       = $this->createTimeStamp()->time;
        $query               = "INSERT INTO `website`(`url`, `ip`, `date_and_time`, created, `status`) VALUES  ('$data->url','$data->ip','$data->date_and_time',$data->created,$data->status)";
        $id                  = $this->callInsertQuery( $query );
        $key                 = $this->encriptKey( $id );
        $gurl                = "<script src='" . URL . "controller/connectore.js' url = '" . URL . "api/' key = '" . $key . "'></script>";
        print(json_encode( array( "status" => true , "msg" => $gurl ) ) );
    }

    //onfirst time load url set status is online

    public function setUrlStatus( $data )
    {
        $data      = ( object ) $this->clearData( ( array ) $data );
        $data->key = $this->decrptKey( $data->key );
        $checker   = $this->conn->query( "SELECT id FROM website WHERE id = $data->key " );
        if ( $checker->num_rows > 0 )
        {
            $this->conn->query( "UPDATE website SET online = true WHERE id = $data->key" );
            $keyword     = json_encode( $data->meta->keywords );
            $description = json_encode( $data->meta->description );
            $isHere      = $this->conn->query( "SELECT id FROM url_details WHERE url = '$data->curl' AND siteid = $data->key" );

            if ( $isHere->num_rows === 0 )
            {

                $query = "INSERT into url_details (`url`, `keywords`, `description`, `views`, `click`, `siteid`,title,date) VALUES ('$data->curl','$keyword','$description',0,0,$data->key,'$data->title','{$this->createTimeStamp()->date}')";
                $this->conn->query( $query );
                echo $this->conn->error;
            }
        }
    }

//Get all sites

    public function getAllSites()
    {
        $tmp = array();
        $res = $this->conn->query( "SELECT * FROM website" );
        if ( !$this->conn->error )
        {
            foreach ( $res as $r )
            {
                $r[ 'id' ] = $this->encriptKey( $r[ 'id' ] );
                array_push( $tmp , $r );
            }
        }
        else
        {
            echo "---------------------->" . $this->conn->error;
        }

        print(json_encode( array( "status" => true , "msg" => $tmp ) ) );
    }

    //get One task by id

    public function getThisProject( $data )
    {
        $data      = ( object ) $this->clearData( ( array ) $data );
        $key       = $data->key;
        $data->key = $this->decrptKey( $data->key );

        $res = $this->conn->query( "SELECT * FROM website WHERE id = $data->key" );
        if ( !$this->conn->error )
        {
            foreach ( $res as $r )
            {
                $r[ 'id' ]      = $this->encriptKey( $r[ 'id' ] );
                $r[ 'pages' ]   = $this->searchQuery( "SELECT * FROM url_details WHERE siteid = $data->key" );
                $r[ 'curl' ]    = "<script src='" . URL . "controller/connectore.js' url = '" . URL . "api/' key = '" . $key . "'></script>";
                $r[ 'tviews' ]  = $this->getTaskList( $data->key , "view" );
                $r[ 'tclick' ]  = $this->getTaskList( $data->key , "click" );
                $r[ 'alex' ]    = 1; //$this->getAlexaRanking($r['url']);
                $r[ 'last' ]    = $this->getLastUser( $data->key );
                $r[ 'cviews' ]  = $this->getTrafficByCountry( $data->key , "view" );
                $r[ 'cclicks' ] = $this->getTrafficByCountry( $data->key , "click" );
                print(json_encode( array( "status" => true , "msg" => $r ) ) );
            }
        }
        else
        {
            echo "---------------------->" . $this->conn->error;
        }
    }

    //Get get Task List list
    public function getTaskList( $id , $p )
    {
        $tmp   = array();
        $dates = $this->getPriviwsSevenDays( 7 );
        foreach ( $dates as $i )
        {
            $res = $this->conn->query( "SELECT id FROM activity WHERE DATE(date) = '$i' AND siteid = $id AND status = '$p'" );
            if ( !$this->conn->error )
            {
                array_push( $tmp , $res->num_rows );
            }
            else
            {
                echo "getTaskList error----->" . $thsis->conn->error;
            }
        }
        return $tmp;
    }

    //get Country wise traffice

    function getTrafficByCountry( $id , $p )
    {
        $tmp = array();
        $res = $this->conn->query( "SELECT country FROM activity WHERE siteid = $id AND status = '$p'" );
        if ( !$this->conn->error )
        {
            foreach ( $res as $r )
            {
                array_push( $tmp , $r[ 'country' ] );
            }
        }
        else
        {
            echo "getTaskList error----->" . $thsis->conn->error;
        }

        return $tmp;
    }

    function getAlexaRanking( $url )
    {
        $rank = simplexml_load_file( 'http://data.alexa.com/data?cli=10&dat=snbamz&url=' . $url );
        return $rank;
    }

    //Update keywords details
    public function updateKeyWords( $data )
    {
        $data = ( object ) $this->clearData( ( array ) $data );
        $key  = json_encode( $data->keywords );
        $dis  = json_encode( $data->description );
        $this->conn->query( "UPDATE url_details SET keywords = '$key',description = '$dis',title = '$data->title' WHERE id = $data->id" );
        if ( $this->conn->error )
        {
            echo "---------------------->" . $this->conn->error;
        }
        else
        {
            print(json_encode( array( "status" => true , "msg" => "Records successfully updated" ) ) );
        }
    }

    public function getCurrentMetaForThisPage( $data )
    {
        $data = ( object ) $this->clearData( ( array ) $data );
        $res  = $this->conn->query( "SELECT title,keywords,description FROM url_details WHERE url = '$data->curl' " );
        if ( $res->num_rows > 0 )
        {
            foreach ( $res as $r )
            {
                $r[ 'keywords' ]    = json_decode( $r[ 'keywords' ] );
                $r[ 'description' ] = json_decode( $r[ 'description' ] );
                print(json_encode( $r ) );
            }
        }
        else
        {
            echo 0;
        }
    }

    function setUserCompleatTrackingDetails( $data )
    {
        $data       = ( object ) $this->clearData( ( array ) $data );
        $data->date = $this->createTimeStamp()->date;
        $data->time = $this->createTimeStamp()->time;
        $data->key  = $this->decrptKey( $data->key );
        $hit        = json_encode( $data->status );
        $pin        = 0;
        if ( !empty( $this->postal ) )
            $pin        = $this->postal;

        $query = "INSERT INTO `activity`(`ip`, `siteid`, `date`, `created`, `host`, `city`, `state`, `country`, `location`, `org`, `pin`, `url`, `hit`, `status`) VALUES "
                . "('$data->ip',$data->key,'$data->date',$data->time,'$data->hostname','$data->city','$data->region','$data->country','$data->loc','$data->org',$pin,'$data->url','$hit','{$data->status->type}')";
        $this->conn->query( $query );
        if ( !$this->conn->error )
        {
            if ( $data->status->type === 'view' )
            {

                $res = $this->conn->query( "SELECT views FROM website WHERE id = $data->key" );
                foreach ( $res as $r )
                {
                    $views = $r[ 'views' ] + 1;
                    $res   = $this->conn->query( "UPDATE website SET views = $views WHERE id = $data->key" );
                }

                $rul = $this->conn->query( "SELECT views FROM url_details WHERE url = '$data->url'" );
                foreach ( $rul as $rl )
                {
                    $views = $rl[ 'views' ] + 1;
                    $res   = $this->conn->query( "UPDATE url_details SET views = $views WHERE url = '$data->url'" );
                }
            }
            else
            {
                $res = $this->conn->query( "SELECT click FROM website WHERE id = $data->key" );
                foreach ( $res as $r )
                {
                    $click = $r[ 'click' ] + 1;
                    $res   = $this->conn->query( "UPDATE website SET click = $click WHERE id = $data->key" );
                }

                $rul = $this->conn->query( "SELECT click FROM url_details WHERE url = '$data->url'" );
                foreach ( $rul as $rl )
                {
                    $click = $rl[ 'click' ] + 1;
                    $res   = $this->conn->query( "UPDATE url_details SET click = $click WHERE url = '$data->url'" );
                }
            }
        }
        else
        {
            echo $this->conn->error;
        }
    }

    public function getLastUser( $id )
    {
        $res = $this->conn->query( "SELECT  * FROM activity WHERE siteid = $id ORDER BY id DESC LIMIT 1 " );
        if ( $this->conn->error )
        {
            echo "------------> {$this->conn->error}";
        }
        else
        {
            foreach ( $res as $r )
            {
                return $r;
            }
        }
    }

    public function getBaseUser()
    {
        $res = $this->conn->query( "SELECT * FROM user LIMIT 1" );
        if ( $this->conn->error )
        {
            echo "---------------->" . $this->conn->error;
        }
        else
        {
            foreach ( $res as $r )
            {
                print(json_encode( array( "status" => true , "msg" => $r ) ) );
            }
        }
    }

    public function upadateProfile( $data , $file )
    {
        $data = $this->clearData( $data );
        if ( isset( $file[ 'name' ] ) )
        {
            move_uploaded_file( $file[ 'tmp_name' ] , "../uploads/" . $file[ 'name' ] );
            $logo = $file[ 'name' ];
            $qry  = "UPDATE user SET first_name = '{$data[ 'first_name' ]}' , last_name = '{$data[ 'last_name' ]}' ,logo = '$logo' WHERE id = {$data[ 'id' ]}";
        }
        else
        {
            $qry = "UPDATE user SET first_name = '{$data[ 'first_name' ]}' , last_name = '{$data[ 'last_name' ]}' WHERE id = {$data[ 'id' ]}";
        }

        $this->conn->query( $qry );
        if ( $this->conn->error )
        {
            echo "This is update profile error--->" . $this->conn->error;
        }
        else
        {
            print(json_encode( array( "status" => true , "msg" => "User profile successfully updated" ) ) );
        }
    }

    //set user lock here

    public function setLockStatus( $data )
    {
        $this->conn->query( "UPDATE user SET locks = true  WHERE id = $data->id " );
        if ( $this->conn->error )
        {
            echo "This is user erorr--->" . $this->conn->error;
        }
        else
        {
            print(json_encode( array( "status" => true ) ) );
        }
    }

    public function setUnlock( $data )
    {
        $res = $this->conn->query( "SELECT id FROM user WHERE id = $data->id AND password = '$data->password'" );
        if ( $res->num_rows > 0 )
        {
            $this->conn->query( "UPDATE user SET locks = false  WHERE id = $data->id " );
            if ( $this->conn->error )
            {
                echo "This is user erorr--->" . $this->conn->error;
            }
            else
            {
                print(json_encode( array( "status" => true ) ) );
            }
        }
        else
        {
            print(json_encode( array( "status" => false , "msg" => "Entered password is incorrect" ) ) );
        }
    }

    public function getLockStatus( $data )
    {
        $res = $this->conn->query( "SELECT id FROM user WHERE id = $data->id AND locks = true" );
        if ( $res->num_rows > 0 )
        {
            print(json_encode( array( "status" => true ) ) );
        }
        else
        {
            print(json_encode( array( "status" => false ) ) );
        }
    }

    public function changePassword( $data )
    {
        $res = $this->conn->query( "SELECT id FROM user WHERE password = '$data->oldp' AND id = $data->id" );
        if ( $res->num_rows > 0 )
        {
            $this->conn->query( "UPDATE user SET password = '$data->newp'" );
            if ( $this->conn->error )
            {
                echo "------------>" . $this->conn->error;
            }
            else
            {
                print(json_encode( array( "status" => true , "msg" => "Your password successfully changed" ) ) );
            }
        }
        else
        {
            print(json_encode( array( "status" => false , "msg" => "Entered old password is incorrect" ) ) );
        }
    }

    public function loadHomePageData()
    {
        $tmp            = array();
        $tmp[ 'w' ]     = $this->conn->query( "SELECT id FROM website " )->num_rows;
        $tmp[ 'p' ]     = $this->conn->query( "SELECT id FROM url_details " )->num_rows;
        $tmp[ 'v' ]     = $this->conn->query( "SELECT id FROM activity WHERE status = 'view'" )->num_rows;
        $tmp[ 'c' ]     = $this->conn->query( "SELECT id FROM activity WHERE status = 'click' " )->num_rows;
        $tmp[ 'view' ]  = $this->lastSevenDays( "view" );
        $tmp[ 'click' ] = $this->lastSevenDays( "click" );
        print(json_encode( array( "status" => true , "msg" => $tmp ) ) );
    }

    function lastSevenDays( $p )
    {
        $tmp   = array();
        $dates = $this->getPriviwsSevenDays( 7 );
        foreach ( $dates as $i )
        {
            $res = $this->conn->query( "SELECT id FROM activity WHERE DATE(date) = '$i' AND status = '$p'" );
            if ( !$this->conn->error )
            {
                array_push( $tmp , $res->num_rows );
            }
            else
            {
                echo "getTaskList error----->" . $thsis->conn->error;
            }
        }
        return $tmp;
    }

    public function deleteThisProject( $data )
    {
        $data->id = $this->decrptKey( $data->id );
        $this->conn->query( "DELETE FROM website WHERE id = $data->id" );
        if ( $this->conn->error )
        {
            echo "-----------+++++++++++------>" . $this->conn->error;
        }
        else
        {
            print(json_encode( array( "status" => true ) ) );
        }
    }

}
