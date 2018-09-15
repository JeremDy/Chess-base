var app = {
/*eslint:disable*/
    init : function(){
        $('#chat').on('submit', app.sendMessage);
        $('#match-making').on('click', app.matchMaking);

        console.log('init');

        var webSocket = WS.connect("ws://127.0.0.1:8080");

        webSocket.on("socket/connect", function(session){
            app.session = session;
            session.subscribe("chat/global", function(uri, payload){
                console.log('payload sub chat global',payload);
            });


            session.subscribe("chat/private", function(uri, payload){		
                console.log('payload sub chat private',payload);		
       
            });

        })
     

        webSocket.on("socket/disconnect", function(error){
            //error provides us with some insight into the disconnection: error.reason and error.code

            console.log("Disconnected for " + error.reason + " with code " + error.code);
        })
    },

    sendMessage :function(evt){
        evt.preventDefault();
       
        var message = $(this).find('input').val();
        var receiver =$(this).find('select').val();
        
        if(receiver === 'public'){
            app.session.publish("chat/global", { 'receiver': receiver , 'message' : message});
        }
        else{
            app.session.publish("chat/private", { 'receiver': receiver , 'message' : message});
        }
    },

    
    matchMaking : function(evt){
        app.session.subscribe('matchmaking', function(uri,payload){
            console.log(payload);
            if(typeof payload.matchFound !== 'undefined'){
                app.session.unsubscribe('matchmaking');
                location.href = BASE_URL + payload.matchFound;
            }
        });


    }

}

$(app.init);