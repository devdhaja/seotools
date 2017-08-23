<?php

define( 'HOST' , "*******" );
define( 'DB' , "*********" );
define( 'USER' , "*******" );
define( 'PASSWORD' , "****" );
define( 'KEY' , "devrajverma" );
define( 'URL' , "https://demoseotools.herokuapp.com/" );

class config
{

    //put your code here

    public $key  = "";
    public $conn = null;

    //Create to database
    public function __construct()
    {
        $this->conn = new mysqli( HOST , USER , PASSWORD , DB );
        if ( $this->conn->connect_error )
        {
            echo "Connection Error->" . $this->conn->connect_error;
        }
        else
        {
            $this->conn;
        }
    }

    //Close connection here

    public function __destruct()
    {
        $this->conn->close();
    }

    //sanetise data before save

    public function clearData( $inp )
    {
        if ( is_array( $inp ) )
            return array_map( __METHOD__ , $inp );

        if ( !empty( $inp ) && is_string( $inp ) )
        {
            return str_replace( array( '\\' , "\0" , "\n" , "\r" , "'" , '"' , "\x1a" ) , array( '\\\\' , '\\0' , '\\n' , '\\r' , "\\'" , '\\"' , '\\Z' ) , $inp );
        }

        return $inp;
    }

    //call query here

    public function callInsertQuery( $query )
    {
        $this->conn->query( $query );
        if ( $this->conn->error )
        {
            echo"Error" . $this->conn->error;
        }
        else
        {
            return $this->conn->insert_id;
        }
    }

    //get user ip address

    public function getUserIpAddress()
    {
        return $_SERVER[ 'SERVER_ADDR' ];
    }

    //get Current time stamp

    public function createTimeStamp()
    {
        $date = new DateTime();
        return ( object ) array( "time" => $date->getTimestamp() , 'date' => date( "Y-m-d H:i:s" ) );
    }

    public function encriptKey( $key )
    {
        return base64_encode( mcrypt_encrypt( MCRYPT_RIJNDAEL_256 , md5( KEY ) , $key , MCRYPT_MODE_CBC , md5( md5( KEY ) ) ) );
    }

    public function decrptKey( $key )
    {
        return rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256 , md5( KEY ) , base64_decode( $key ) , MCRYPT_MODE_CBC , md5( md5( KEY ) ) ) , "\0" );
    }

    public function searchQuery( $qry )
    {
        $tmp = array();
        $res = $this->conn->query( $qry );
        foreach ( $res as $r )
        {
            $r['keywords'] = json_decode($r['keywords']);
            $r['description'] = json_decode($r['description']);
            array_push( $tmp , $r );
        }
        
        return $tmp;
    }
    
    //This function return previews seven days date
    public function getPriviwsSevenDays( $num )
    {
        $tmp = array();
        for ( $i = $num; $i > 0; $i-- )
        {
            $k = $i - 1;
            array_push( $tmp , date( 'Y-m-d' , strtotime( "-{$k
                                    } days" ) ) );
        }
        return $tmp;
    }

}


