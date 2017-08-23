function getSyncScriptParams () {
    var scripts = document.getElementsByTagName ( 'script' ) ;

    var key = "" ;
    var url = "" ;
    for ( var i = 0 ; i < scripts.length ; i ++ ) {
        if ( scripts[i].getAttribute ( 'key' ) ) {
            key = scripts[i].getAttribute ( 'key' ) ;
        }
        if ( scripts[i].getAttribute ( 'key' ) ) {
            url = scripts[i].getAttribute ( 'url' ) ;
        }
    }
    return {
        key : key ,
        url : url
    } ;
}

function getElementDetails () {
    return {
        title : function () {
            var title = document.getElementsByTagName ( 'title' ) ;
            return title[0].innerHTML ;
        } ,
        meta : function () {
            var keywords = [ ] ;
            var description = [ ] ;
            var meta = document.getElementsByTagName ( 'meta' ) ;
            for ( var i = 0 ; i < meta.length ; i ++ ) {
                if ( meta[i].getAttribute ( 'name' ) === 'keywords' ) {
                    keywords.push ( meta[i].getAttribute ( 'content' ) ) ;
                }
                if ( meta[i].getAttribute ( 'name' ) === 'description' ) {
                    description.push ( meta[i].getAttribute ( 'content' ) ) ;
                }
            }
            return {
                keywords : keywords ,
                description : description
            } ;
        } ,
        url : function () {
            return window.location.href ;
        } ,
        setTitle : function ( title ) {
            if ( title === undefined || title === "" || this.title () === title ) {
                //do nothing
            } else {
                document.getElementsByTagName ( 'title' )[0].innerHTML = title ;
            }
        } ,
        setKeywordsAndDesc : function ( keywords , metaData ) {
            if ( keywords === undefined || keywords === "" || keywords.length === 0 ) {
                //do nothing
            } else {
                var isKey = false ;
                var isMeta = false ;
                var meta = document.getElementsByTagName ( 'meta' ) ;
                for ( var i = 0 ; i < meta.length ; i ++ ) {
                    if ( meta[i].getAttribute ( 'name' ) === 'keywords' ) {
                        isKey = true ;
                        meta[i].setAttribute ( 'content' , this.getString ( keywords ) ) ;
                    }
                    if ( meta[i].getAttribute ( 'name' ) === 'description' ) {
                        isMeta = true ;
                        meta[i].setAttribute ( 'content' , this.getString ( metaData ) ) ;
                    }
                }
                if ( ! isKey ) {
                    var tag = document.createElement ( 'meta' ) ;
                    tag.name = 'keywords' ;
                    tag.content = this.getString ( keywords ) ;
                    document.getElementsByTagName ( 'head' )[0].appendChild ( tag ) ;
                }
                if ( ! isMeta ) {
                    var metaTag = document.createElement ( 'meta' ) ;
                    metaTag.name = 'description' ;
                    metaTag.content = this.getString ( metaData ) ;
                    document.getElementsByTagName ( 'head' )[0].appendChild ( metaTag ) ;
                }
            }
        } ,
        getString : function ( params ) {
            var str = "" ;
            for ( var i = 0 ; i < params.length ; i ++ ) {
                str = str + params[i] + " " ;
            }
            return str ;
        }
    } ;
}

function ajaxCallForCheckUserDetails () {
    var key = getSyncScriptParams ().key ;
    var url = getSyncScriptParams ().url + "setUrlStatus" ;
    var xhr = new XMLHttpRequest () ;
    xhr.open ( "POST" , url , true ) ;
    xhr.setRequestHeader ( "Content-type" , "application/json" ) ;
    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            //  var json = JSON.parse(xhr.responseText);
            //console.log(json)
        }
    } ;
    var senderJson = {
        key : key ,
        curl : getElementDetails ().url () ,
        title : getElementDetails ().title () ,
        meta : getElementDetails ().meta ()
    } ;
    var data = JSON.stringify ( senderJson ) ;
    xhr.send ( data ) ;
}
//console.log(getElementDetails().meta());
function getAllMetaDeatils () {
    var xhr = new XMLHttpRequest () ;
    var url = getSyncScriptParams ().url + "getCurrentMetaForThisPage" ;
    xhr.open ( "POST" , url , true ) ;
    xhr.setRequestHeader ( "Content-Type" , "application/json; charset=UTF-8" ) ;

    // xhr.setRequestHeader("Access-Control-Request-Headers", "X-Requested-With, accept, content-type");
    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            var json = JSON.parse ( xhr.responseText ) ;
            //console.log(json)
            ajaxCallForCheckUserDetails () ;
            getElementDetails ().setTitle ( json.title ) ;
            getElementDetails ().setKeywordsAndDesc ( json.keywords , json.description ) ;
        }
    } ;
    var senderJson = {
        curl : getElementDetails ().url ()
    } ;
    var data = JSON.stringify ( senderJson ) ;
    xhr.send ( data ) ;
}

function getUserDeatils ( callback ) {
    var url = "//ipinfo.io/json" ;
    var xhr = new XMLHttpRequest () ;
    xhr.open ( "GET" , url , true ) ;
    xhr.setRequestHeader ( "Content-Type" , "application/json; charset=UTF-8" ) ;

    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            var json = JSON.parse ( xhr.responseText ) ;
            callback ( json ) ;
        }
    } ;
    xhr.send () ;
}
getAllMetaDeatils () ;

function mainCallForCheck ( d ) {
    getUserDeatils ( function ( data ) {
        data.url = getElementDetails ().url () ;
        data.key = getSyncScriptParams ().key ;
        data.status = d ;
        var url = getSyncScriptParams ().url + "setUserCompleatTrackingDetails" ;
        var xhr = new XMLHttpRequest () ;
        xhr.open ( "POST" , url , true ) ;
        xhr.setRequestHeader ( "Content-Type" , "application/json; charset=UTF-8" ) ;
        
        xhr.onreadystatechange = function () {
            if ( xhr.readyState == 4 && xhr.status == 200 ) {
                var json = xhr.responseText ;
                console.log ( json ) ;
            }
        } ;
        var sendData = JSON.stringify ( data ) ;
        xhr.send ( sendData ) ;
    } ) ;
}
document.onclick = check ;

function check ( e ) {
    var d = {
        type : 'click' ,
        width : e.x ,
        height : e.y
    } ;
    mainCallForCheck ( d ) ;
}
var d = {
    type : 'view'
} ;
mainCallForCheck ( d ) ;