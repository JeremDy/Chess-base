var app = {
    /*eslint:disable*/
    init: function () {
        $('#match-making').on('click', app.matchMaking);
        $('#invitation').on('submit', app.invitation);
        $('#invitationModal').on('hidden.bs.modal', app.refuseInvitation);
        $('#invitation-ok').on('click', app.acceptInvitation);


        var webSocket = WS.connect("ws://127.0.0.1:8080");

        webSocket.on("socket/connect", function (session) {
            app.session = session;         
           app.invitationSubscribe();
        })

        webSocket.on("socket/disconnect", function (error) {
            //error provides us with some insight into the disconnection: error.reason and error.code
            console.log("Disconnected for " + error.reason + " with code " + error.code);
        })
    },
    
    matchMaking: function () {
        app.session.subscribe('matchmaking', function (uri, payload) {
            if (typeof payload.matchFound !== 'undefined') {
                app.session.unsubscribe('matchmaking');
                location.href = BASE_URL + payload.matchFound;
            }
        });
    },

    invitationSubscribe : function(){
        app.session.subscribe("invitation", function (uri, payload) {
            if (payload.type === 'invite') {
                app.session.unsubscribe('invitation');
                $('#invitationModal').modal('show');
                $('.modal-body').text(payload.message);
                app.currentInvitationChannel = payload.channel;
                app.session.subscribe(app.currentInvitationChannel, function(uri, payload){
                    if (payload.type === 'cancel'){
                        console.log('invitation annulé');
                        app.session.unsubscribe(app.currentInvitationChannel);
                        app.invitationSubscribe();
                        $('#invitationModal').modal('hide')
                    }
                })
            }
        });
    },

    invitation: function (evt) {
        evt.preventDefault();
        var receiver = $(this).find('input').val();    
        app.session.publish("invitation", {
            'receiver': receiver,
            "type": "invite"
        });
        app.session.unsubscribe("invitation");
        app.currentInvitationChannel = "invitation/" + USER_NAME + '/' + receiver;
      
        app.session.subscribe(app.currentInvitationChannel, function (uri, payload) {
           
            if(typeof payload.type !== 'undefined'){
               
                if(payload.type === 'cancel'){
                    console.log('invitation annulé !');
                    app.session.unsubscribe(app.currentInvitationChannel);
                    app.invitationSubscribe();
                }

                if (payload.type === 'refuse') {
                    console.log('invitation refusé');
                    app.session.unsubscribe(app.currentInvitationChannel);
                    app.invitationSubscribe();
                }

                if (payload.type === 'accept'){
                    //redirection
                    console.log('invitation accepté');
                    location.href = BASE_URL + payload.matchFound;
                }
            }
        });   
    },


    acceptInvitation: function () {
        app.session.subscribe(app.currentInvitationChannel, function (uri, payload) {
            if (typeof payload.matchFound !== 'undefined') {          
                location.href = BASE_URL + payload.matchFound;
            }
        });
        app.session.publish(app.currentInvitationChannel, {
            'type': 'accept'
        });
    },


    refuseInvitation: function () {
        app.session.subscribe(app.currentInvitationChannel);
        app.session.publish(app.currentInvitationChannel, {
            'type': 'refuse'
        });
        app.session.unsubscribe(app.currentInvitationChannel);
        app.invitationSubscribe();
    }



}

$(app.init);