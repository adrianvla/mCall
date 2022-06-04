// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCAN3p8YKt4Eo26tpktNqlX4N1Eo3gE0t4",
    authDomain: "morisinc-call.firebaseapp.com",
    projectId: "morisinc-call",
    storageBucket: "morisinc-call.appspot.com",
    messagingSenderId: "1043391457632",
    appId: "1:1043391457632:web:0a59dd9568f40e32035605",
    measurementId: "G-HQ2TGHNPZS"
};
var provider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var user;
var tok;
$('.login').on('click', function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            tok = credential.accessToken;
            user = result.user;
            init();
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
});




function init() {
    $('.login').remove();
    $('.cinput').css('display', 'flex');
    $('.cbtn').css('display', 'flex');
}


firebase.analytics();
var db = firebase.firestore();
var calls = db.collection('calls');

function generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function startcall(id) {
    if (id == '') id = generate_token(10);

    calls.doc(id).set({
        users: [cuser()],
        owner: {
            gid: user.uid,
            peerId: peer.id
        }
    }).then(function () {

        connect(id);
    });
    return id;
}


function cuser() {
    var u = {};
    u.uid = user.uid;
    u.name = user.displayName;
    u.avatar = user.photoURL;
    u.peerId = peer.id;
    return u;
}
var currentroom;

function connect(callID) {

    calls.doc(callID).get().then(async function (a) {
        a=a.data();
        currentroom = a;
        a.users.forEach(function (item){
            getConnect(item.peerId);
        });
        var as = true;
        currentroom.users.every(function(item){
           if(item.peerId==peer.id){
               as = false;
               return false;
           }else{
               return true;
           }
        });
        if(as) currentroom.users.push(cuser());

        calls.doc(callID).update(currentroom);        
    })





}
setInterval(function () {
    $("body").get(0).style.setProperty("--height", $(window).height() + 'px');
}, 100);

$('.cbtn').on('click', function () {
    var v = $('.cinput')[0].value;
    callamb(v);
});


function callamb(v) {
    gsap.to('.center', {
        opacity: 0,
        duration: 0.3
    });
    setTimeout(function () {
        $('.center').css('display', 'none');
        $('.precall').css('display', 'flex');
    }, 1000);
    setTimeout(function () {
        gsap.to('.vc', {
            marginTop: 0,
            duration: 1,
            ease: 'ease-in-out'
        });
    }, 1000);
    setTimeout(function () {
        gsap.to('.bcc', {
            marginTop: 0,
            duration: 1,
            ease: 'ease-in-out'
        });
    }, 1500);
    setTimeout(function () {
        gsap.to('.mic', {
            marginTop: 0,
            duration: 1,
            ease: 'ease-in-out'
        });
    }, 1000);
    setTimeout(function () {
        gsap.to('.video', {
            marginTop: 0,
            duration: 1,
            ease: 'ease-in-out'
        });
    }, 1333);
    setTimeout(function () {
        gsap.to('.connect', {
            marginTop: 0,
            duration: 1,
            ease: 'ease-in-out'
        });
    }, 1666);
    $('.vc,.bcc').css('margin-top', $(window).height() * 1.5 + 'px');
    $('.mic,.video,.connect').css('margin-top', $(window).height() * 1.1 + 'px');
    $('.vid,.bcc').css('position', 'absolute');
    if (v == '') v = generate_token(10);
    $('.ROOMIDSHOW').text(v);
    callambs(v);
    roomidd=v;
}
var roomidd;
var locStream;
var vidprocess;
var videoprocess = document.getElementById("videoprocess");
var vidctx = videoprocess.getContext('2d');
var vdata;




// Array of remote peers ID and data channel
var remotePeerIds = []; // You need this to link with specific DOM element
var connections = []; // This is where you manage multi-connections
// create a Peer
//var peer = new Peer({key: 'YOUR_KEY'}); // You can use your own peerID here


const webRTC_CONFIG = {
    secure: true,
    "iceServers": [
        {
          "urls": "stun.l.google.com:19302"
        },
        {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
      ],
};
var peer = new Peer(webRTC_CONFIG); // You can use your own peerID here

// Get your local peer id
peer.on('open', function (id) {
    console.log(id);
});

// Start connection with other peer - and handle it
function getConnect(remotePeerId) {
    var conn = peer.connect(remotePeerId);
    handleConnection(conn);
}

// Ok now you need to handle the received connection too
peer.on('connection', function (conn) {
    handleConnection(conn);
});
class Vid{
    constructor(peerID){
        this.peerID = peerID;
        
        var el = $('<div class="vi"><div class="vidd"><video class="_'+peerID+'" autoplay></video></div></div>')[0];
        $('.videos-c').append(el);
        
    }
    update(packet){
        var tk = generate_token(5);
        //$('.processor').append($('<video src="'+CryptoJS.AES.decrypt(packet.data, password).toString(CryptoJS.enc.Utf8)+'" class="processor_'+this.peerID+'_'+tk+'" autoplay muted style="opacity:0;pointer-events:none;position:absolute;"></video>')[0]);
        //$('._'+this.peerID).attr('src',CryptoJS.AES.decrypt(packet.data, password).toString(CryptoJS.enc.Utf8));
        /*$('.processor_'+this.peerID+'_'+tk).on('load',function(){
            $('._'+peerID).attr('src',$(this).attr('src'));
            $('.processor_'+peerID+'_'+tk).remove();
        });*/

        //$('._'+this.peerID+'').attr('src',CryptoJS.AES.decrypt(packet.data, password).toString(CryptoJS.enc.Utf8));
        //console.log(CryptoJS.AES.decrypt(packet.data, password).toString(CryptoJS.enc.Utf8));
    }
    close(){

    }
}
var currentpacket = {};
var videls = {};
// Handle connection - this is most important part
function handleConnection(conn) {
    remotePeerIds.push(conn.peer); // Add remote peer to list
    remotePeerIds = remotePeerIds.filter(function(e) { return e !== peer.id });
    conn.on('open', function () {
        console.log("Connected with peer: " + conn.peer);
        videls[conn.peer] = new Vid(conn.peer);
        conn.on('data', function (data) {
            // You can do whatever you want with the data from this connection - this is also the main part
            currentpacket[conn.peer]=data;
            videls[conn.peer].update(data);
        });
        conn.on('error', function () {
            // handle error 
            connectionError(conn);
        });

        conn.on('close', function () {
            // Handle connection closed
            connectionClose(conn);
        });
        connections.push(conn);
    });
}

function dataHandler(a, b) {
    console.log(b);
}
// So now you have multi-connections. If you want to send a message to all other peer, just using for loop with all the connections
function broadcastMessage(message) {
    for (var i = 0; i < connections.length; i++) {
        connections[i].send(message);
    }
}

// Or if you want to send a message to a specific peer - you need to know his peerid

function privateMessage(remotePeerId, message) {
    for (var i = 0; i < connections.length; i++) {
        if (connections[i].peer == remotePeerId) {
            connections[i].send(message);
            break;
        }
    }
}
var thatstream;
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}
function getVid(fps,s){
    return new Promise(function(resolve, reject) {
        var st = new MediaRecorder(s);
        var chunks = [];
        st.ondataavailable = function(e) {
            chunks.push(e.data);
          }
        st.start();
        st.onstop = function(e) {
        
            var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            blobToDataURL(blob,function(a){resolve(a)});
          }
        setTimeout(function(){
            st.stop();
        },(1000/fps));
    });
    
}
var password = '1234';
function createpacket(ms,s){

    return new Promise(function(resolve, reject){

        var fps = 1000/ms;
        var packet = {};
        packet.peer = peer.id;
        getVid(fps,s).then(function(b64){
            packet.data=CryptoJS.AES.encrypt(b64, password).toString();
            resolve(packet);
        });
    });
}
var viddd;
function callambs(v) {
    navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        .then(function (localStream) {
            thatstream = localStream;
            document.getElementById("localVideo").srcObject = localStream;
            //localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
            vidprocess = setInterval(function () {
                createpacket(1000/1,localStream).then(function(packet){
                    broadcastMessage(packet);
                });
            }, (1000/1));
            viddd = setInterval(function () {
                
                vidctx.drawImage(document.getElementById("localVideo"), 0, 0);
                document.getElementById("preview").getContext('2d').drawImage(document.getElementById("localVideo"), 0, 0);
                vdata = videoprocess.toDataURL('image/jpeg', 0.5);
            },33);
        })
        .catch(function (e) {
            console.log(e)
        });
}


$('.connect').on('click', function () {
    console.log('clicked connect')
    calls.doc(roomidd).get().then(function (a) {
        console.log('read successfully');
        a = a.data();
        if (a == undefined) {
            startcall(roomidd);
        } else {
            connect(roomidd);
        }
        gsap.to('.precall',{duration:0.5,opacity:0});
        $('.conf').css('display', 'flex');
        $('.conf').css('opactiy', '0');
        gsap.to('.conf',{duration:0.5,opacity:1});
        setTimeout(function () {
            $('.precall').css('display', 'none');
        },500);
    });
});