// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional





$('.link').on('click', function (){
    var cs = location.protocol+'//'+location.host+location.pathname+(location.search?location.search:"");
    copyStringToClipboard(cs+'#'+roomidd);
});



$('.mail').on('click', function (){
    var cs = location.protocol+'//'+location.host+location.pathname+(location.search?location.search:"")+'#'+roomidd;
    window.open('mailto:?body='+cs);
});

function copyStringToClipboard (str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 }

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

function getimage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        var blb = new Blob([xhr.response], {
            type: 'image/png'
        });
        blobToDataURL(blb, function (a) {

            callback(a);
        });
    }

    xhr.open('GET', 'https://ip.webmasterapi.com/api/imageproxy/' + encodeURIComponent(url));
    xhr.send();
}
var nocamstream;

function init() {


    $('.login').remove();
    $('.cinput').css('display', 'flex');
    $('.cbtn').css('display', 'flex');
    if(window.location.hash.replace('#','')!=''){
        (async function(){
            $('.cinput').val(window.location.hash.replace('#',''));
            $('.cbtn').trigger('click');
        })();
    }
}
class noconnimg {
    constructor(peer, rm) {
        this.peer = peer;
        this.room = rm;
        return new Promise(function (resolve, reject) {
            getname(peer, rm).then(function (n) {
                var na = $('<canvas width="640" height="480"></canvas>')[0];
                var nn = na.getContext('2d');
                nn.fillStyle = '#171717';
                nn.fillRect(0, 0, na.width, na.height);
                nn.fillStyle = '#fff';
                nn.font = "30px Arial";
                nn.fillText(n.name, 0, na.height - 15);

                var nc = new Image();
                nc.src = 'data:image/png;base64,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';
                nc.onload = function () {
                    nn.drawImage(nc, (na.width / 2) - (96 / 2), (na.height / 2) - (96 * 2) - 10, 96, 96);
                };
                getimage(n.avatar, function (u) {

                    var avatar = new Image();
                    avatar.src = u;
                    avatar.onload = function () {
                        nn.drawImage(avatar, (na.width / 2) - (avatar.width / 2), (na.height / 2) - (avatar.height / 2));

                        nn.fillStyle = '#eeeeeea4';
                        nn.font = "15px Arial";

                        nn.textAlign = "center";
                        nn.textBaseline = "middle";
                        nn.fillText('You Have Denied ' + n.name + ' from connecting to your video and audio', (na.width / 2), ((na.height / 2) + (avatar.height / 2)) + 10);
                        resolve(na.toDataURL('image/jpeg', 1));
                    };
                });
            });
        });


    }
}

firebase.analytics();
var db = firebase.firestore();
var calls = db.collection('calls');
setInterval(function () {
    $('.rmiddply').text(roomidd);

}, 200);
$('.rmid').on('click', function () {

});

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

async function connect(callID) {

    calls.doc(callID).get().then(async function (a) {
        a = a.data();
        currentroom = a;
        a.users.forEach(function (item) {
            getConnect(item.peerId);
        });
        var as = true;
        currentroom.users.every(function (item) {
            if (item.peerId == peer.id) {
                as = false;
                return false;
            } else {
                return true;
            }
        });
        if (as) currentroom.users.push(cuser());
        document.getElementById('prev').srcObject = thatstream;
        calls.doc(callID).update(currentroom);
    })





}
setInterval(function () {
    $("body").get(0).style.setProperty("--height", $(window).height() + 'px');
    $("body").get(0).style.setProperty("--rmidawidth", $('.rmida').width() + 'px');
    $("body").get(0).style.setProperty("--rmidheightc", Number($('.rmid').height() + 50) + 'px');
}, 100);
var rmidpop = false;
$('.rmid').on('click', function () {
    rmidpop = rmidpop ^ 1;
    if (rmidpop) {
        $('.rmidpopup').css('transform', 'translateY(50px)');
        $('.rmidpopup').css('opacity', '0');
        $('.rmidpopup').css('pointer-events', 'all');
        gsap.to('.rmidpopup', {
            duration: 0.2,
            transform: 'translateY(0)',
            opacity: 1
        });
    } else {

        gsap.to('.rmidpopup', {
            duration: 0.2,
            transform: 'translateY(50px)',
            opacity: 0
        });
        $('.rmidpopup').css('pointer-events', 'none');
    }

});
var handraised = false;
$('.hand').on('click', function () {
    handraised = handraised ^ 1;
    if (handraised) {
        $('.prevvi').addClass('raise-hand');
        var au = new Audio('hand.wav');
        au.play();
    } else {
        $('.prevvi').removeClass('raise-hand');

    }
    var p = {
        type: 'HAND',
        h: handraised
    }
    broadcastMessage(p);
});
var selectpr = {};
var opchat = false;
$(document).ready(function () {

    setTimeout(function () {
        var fields = $('.autocomplete-off');
        fields.removeAttr('readonly');
    }, 50);

    $('#chatselect').select2();
});
class chat {
    constructor(p) {
        this.p = p;
        var ms = '';
        if (p.pm) {
            ms = ' <span class="PM">(private message)</span>';
        }
        this.el = $('<div class="cel"><div class="celct">' + p.n + ms + '</div><div class="celctt">' + new Date().getHours() + ':' + new Date().getMinutes() + '</div><div class="celc">' + p.m + '</div></div>')[0];
        $('.chatc').append(this.el);
        $('.chat').addClass('shake');
        setTimeout(function () {
            $('.chat').removeClass('shake');

        }, 100);
    }
}
var oppeople = false;
$('.people').on('click', function () {
    oppeople = oppeople ^ 1;
    if (opchat) {
        $('.chatc-c,.chatci').css('transform', 'translateX(0)');
        gsap.to('.chatc-c,.chatci', {
            duration: 0.2,
            transform: 'translateX(' + ($('.chatc-c').width()) + 'px)'
        });
        opchat = opchat ^ 1;
    }
    if (oppeople) {
        $('._people-c').css('transform', 'translateX(' + ($('._people-c').width()) + 'px)');
        gsap.to('._people-c', {
            duration: 0.2,
            transform: 'translateX(0)'
        });
    } else {

        $('._people-c').css('transform', 'translateX(0)');
        gsap.to('._people-c', {
            duration: 0.2,
            transform: 'translateX(' + ($('._people-c').width()) + 'px)'
        });
    }
});
$('._people-c').css('transform', 'translateX(' + ($('._people-c').width()) + 'px)');
$('.chatc-c,.chatci').css('transform', 'translateX(' + ($('.chatc-c').width()) + 'px)');
$('.chat').on('click', function () {
    opchat = opchat ^ 1;
    if (oppeople) {
        $('._people-c').css('transform', 'translateX(0)');
        gsap.to('._people-c', {
            duration: 0.2,
            transform: 'translateX(' + ($('._people-c').width()) + 'px)'
        });
        oppeople = oppeople ^ 1;
    }
    if (opchat) {
        $('.chatc-c,.chatci').css('transform', 'translateX(' + ($('.chatc-c').width()) + 'px)');
        gsap.to('.chatc-c,.chatci', {
            duration: 0.2,
            transform: 'translateX(0)'
        });
    } else {

        $('.chatc-c,.chatci').css('transform', 'translateX(0)');
        gsap.to('.chatc-c,.chatci', {
            duration: 0.2,
            transform: 'translateX(' + ($('.chatc-c').width()) + 'px)'
        });
    }
});
$('.cbtn').on('click', function () {
    var v = $('.cinput')[0].value;
    callamb(v);
});


function callamb(v) {
    gsap.to('.center', {
        transform: 'scale(0.95)',
        duration: 0.3
    });
    gsap.to('.precall', {
        transform: 'scale(1)',
        duration: 0.3
    });
    $('.center').css('pointer-events', 'none');
    $('.precall').css('display', 'flex');

    $('#preview,.vid').width($('#localVideo').width());
    $('.precall').css('transform', 'scale(0)');
    $('#preview,.vid').height($('#localVideo').height());
    /*$('.vc,.bcc').css('margin-top', $(window).height() * 1.5 + 'px');
    $('.mic,.video,.connect').css('margin-top', $(window).height() * 1.1 + 'px');*/
    $('.vid,.bcc').css('position', 'absolute');
    if (v == '') v = generate_token(10);
    $('.ROOMIDSHOW').text(v);
    callambs(v);
    roomidd = v;
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
    "iceServers": [{
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
    $('.connecting').css('display', 'none');
});

// Start connection with other peer - and handle it


// Ok now you need to handle the received connection too
var threshold = 0.04;
var audios = {};

function getmean(obj) {

    var bf = 0;
    for (var bff = 0; bff < Object.values(obj).length; bff++) {
        bf = bf + Object.values(obj)[bff];
        if (bff == (Object.values(obj).length - 1)) {

            bf = bf / Object.values(obj).length;
            return bf;
        }
    }
}
var chatboxes = [];


var currentpacket = {};
var videls = {};
setInterval(function () {
    var l = $(".vi");
    if (l.length == 1) {
        $('.videos-c').removeClass('vidtwo');
        $('.videos-c').removeClass('vidthree');
        $('.videos-c').addClass('vidone');

    } else if (l.length == 2) {

        $('.videos-c').removeClass('vidone');
        $('.videos-c').removeClass('vidthree');
        $('.videos-c').addClass('vidtwo');
    } else {

        $('.videos-c').removeClass('vidone');
        $('.videos-c').removeClass('vidtwo');
        $('.videos-c').addClass('vidthree');
    }
}, 500);
// Handle connection - this is most important part


function dataHandler(a, b) {
    console.log(b);
}
var connwidgets = {};
peer.on('call', function (call) {
    connwidgets[call.peer] = new conn(call.peer, call);
});
// So now you have multi-connections. If you want to send a message to all other peer, just using for loop with all the connections
function broadcastMessage(message) {
    for (var i = 0; i < connections.length; i++) {
        try {
            connections[i].send(message);
        } catch (e) {
            console.log(e)
        }

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
    a.onload = function (e) {
        callback(e.target.result);
    }
    a.readAsDataURL(blob);
}

function getVid(fps, s) {
    return new Promise(function (resolve, reject) {
        var st = new MediaRecorder(s);
        var chunks = [];
        st.ondataavailable = function (e) {
            chunks.push(e.data);
        }
        st.start();
        st.onstop = function (e) {

            var blob = new Blob(chunks, {
                'type': 'video/ogg; codecs=opus'
            });
            blobToDataURL(blob, function (a) {
                resolve(a);
                console.log(a)
            });
        }
        setTimeout(function () {
            st.stop();
        }, (1000 / fps));
    });

}
var password = '1234';

function createpacket(ms, s) {

    return new Promise(function (resolve, reject) {

        var fps = 1000 / ms;
        var packet = {};
        packet.peer = peer.id;
        getVid(fps, s).then(function (b64) {
            packet.data = CryptoJS.AES.encrypt(b64, password).toString();
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

            /*vidprocess = setInterval(function () {
                createpacket(1000/1,localStream).then(function(packet){
                    broadcastMessage(packet);
                });
            }, (1000/1));*/
            viddd = setInterval(function () {

                $('#preview,.vid').width($('#localVideo').width());
                $('#preview,.vid').height($('#localVideo').height());
                vidctx.drawImage(document.getElementById("localVideo"), 0, 0);
                document.getElementById("preview").getContext('2d').drawImage(document.getElementById("localVideo"), 0, 0);
                vdata = videoprocess.toDataURL('image/jpeg', 0.5);
            }, 33);
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
        gsap.to('.precall', {
            duration: 0.5,
            opacity: 0
        });
        $('.conf').css('display', 'flex');
        $('.conf').css('opactiy', '0');
        gsap.to('.conf', {
            duration: 0.5,
            opacity: 1
        });
        setTimeout(function () {
            $('.precall').css('display', 'none');
        }, 500);
    });
});

var micmuted = false;
var vidmuted = false;

var curconn;

peer.on('connection', function (conn) {

    handleConnection(conn);

});

function getConnect(remotePeerId) {
    var conn = peer.connect(remotePeerId);
    handleConnection(conn);
}
// stop only camera
function stopVideoOnly(stream) {
    var newstream = [];
    stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
        if (track.readyState == 'live' && track.kind === 'audio') {
            newstream.push(track);
        }
    });
    newstream.push(nocamstream.getTracks()[0]);
    return new MediaStream(newstream)
}

// stop only mic
function stopAudioOnly(stream) {
    stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live' && track.kind === 'audio') {
            track.stop();
        }
    });
}

function stopVideo(stream) {
    stream.getTracks().forEach(function (track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}

function streamChange() {
    //thatstream.getTracks()[1].enabled = false
    var p = {};
    p.m = micmuted;
    p.v = vidmuted;
    p.type = 'MUTE';
    broadcastMessage(p);
    if (micmuted) {
        var audiotrack;
        thatstream.getTracks().forEach(function (track, i) {
            if (track.kind === 'audio') {
                if (audiotrack == undefined) {
                    audiotrack = i;
                    thatstream.getTracks()[i].enabled = false
                }
            }
        });
        $('.unmuted').css('display', 'none');
        $('.muted').css('display', 'block');
    } else {

        var audiotrack;
        thatstream.getTracks().forEach(function (track, i) {
            if (track.kind === 'audio') {
                if (audiotrack == undefined) {
                    audiotrack = i;
                    thatstream.getTracks()[i].enabled = true
                }
            }
        });
        $('.unmuted').css('display', 'block');
        $('.muted').css('display', 'none');
    }
    if (vidmuted) {
        var vidtrack;
        thatstream.getTracks().forEach(function (track, i) {
            if (track.kind === 'video') {
                if (vidtrack == undefined) {
                    vidtrack = i;
                    thatstream.getTracks()[i].enabled = false
                }
            }
        });
        $('.mutedvid').css('display', 'block');
        $('.unmutedvid').css('display', 'none');
    } else {

        var vidtrack;
        thatstream.getTracks().forEach(function (track, i) {
            if (track.kind === 'video') {
                if (vidtrack == undefined) {
                    vidtrack = i;
                    thatstream.getTracks()[i].enabled = true
                }
            }
        });
        $('.mutedvid').css('display', 'none');
        $('.unmutedvid').css('display', 'block');
    }
    document.getElementById("localVideo").srcObject = thatstream;
}
$('.swvid').on('click', function () {

    if (vidmuted) {
        vidmuted = false;
    } else {
        vidmuted = true;
    }
    streamChange();

});

$('.mute').on('click', function () {
    if (micmuted) {
        micmuted = false;
    } else {
        micmuted = true;
    }
    streamChange();
});

$('.endcall').on('click', function () {
    calls.doc(roomidd).get().then(function (a) {
        a = a.data();
        (async function () {

            a.users.forEach(function (item, i) {
                if (item.peerId == peer.id) {
                    delete a.users[i];
                }
            });
            a.users = a.users.filter(function (f) {
                return f != undefined
            });
            if (a.owner.peerId == peer.id) { //if im the owner of the room
                try {

                    a.owner.gid = a.users[0].uid; //transfer owner to another peer/user
                    a.owner.peerId = a.users[0].peerId;
                } catch (e) {
                    console.log(e);
                    
                    calls.doc(roomidd).delete(); //delete room
                    window.location.reload();
                }

            }
            if (a.users.length < 1) {
                calls.doc(roomidd).delete(); //delete room
                window.location.reload();
            } else {
                calls.doc(roomidd).set(a);
                window.location.reload();
            }
        })();
    });

    connections.forEach(function (conn, i) {
        conn.close();
        if (connections.length - 1 == i) {
            connections = [];
            remotePeerIds = [];

            $('.conf').css('display', 'none');
            $('.precall').css('display', 'flex');
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
    });
});
class select {
    constructor(peer) {
        this.peer = peer;
        getname(peer, roomidd).then(function (n) {
            var el = $('<option value="' + peer + '" class="option_' + peer + '">' + n.name + '</option>')[0];
            $('#chatselect').append(el);
            $('#chatselect').select2();
        });

    }
    destroy() {
        $('.option_' + this.peer).remove();
        $('#chatselect').select2();
        delete this;
    }
}
var people = {};
class person {
    constructor(peer) {
        this.peer = peer;

        getname(peer, roomidd).then(function (n) {
            var el = $('<div class="a-person person_' + peer + '"><div class="person-name"><span class="personnamespan">' + n.name + '</span> <span class="personhand_' + peer + ' person-hand"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M21,7c0-1.38-1.12-2.5-2.5-2.5c-0.17,0-0.34,0.02-0.5,0.05V4c0-1.38-1.12-2.5-2.5-2.5c-0.23,0-0.46,0.03-0.67,0.09 C14.46,0.66,13.56,0,12.5,0c-1.23,0-2.25,0.89-2.46,2.06C9.87,2.02,9.69,2,9.5,2C8.12,2,7,3.12,7,4.5v5.89 c-0.34-0.31-0.76-0.54-1.22-0.66L5.01,9.52c-0.83-0.23-1.7,0.09-2.19,0.83c-0.38,0.57-0.4,1.31-0.15,1.95l2.56,6.43 C6.49,21.91,9.57,24,13,24h0c4.42,0,8-3.58,8-8V7z M19,16c0,3.31-2.69,6-6,6h0c-2.61,0-4.95-1.59-5.91-4.01l-2.6-6.54l0.53,0.14 c0.46,0.12,0.83,0.46,1,0.9L7,15h2V4.5C9,4.22,9.22,4,9.5,4S10,4.22,10,4.5V12h2V2.5C12,2.22,12.22,2,12.5,2S13,2.22,13,2.5V12h2V4 c0-0.28,0.22-0.5,0.5-0.5S16,3.72,16,4v8h2V7c0-0.28,0.22-0.5,0.5-0.5S19,6.72,19,7L19,16z"/></svg></span></div><div class="person-peer">Peer Id: ' + peer + '</div></div>')[0];
            $('._people').append(el);
        });
    }
    destroy() {
        $('.person_' + this.peer).remove();
        delete this;
    }
    update(p) {
        if (p.type == 'HAND') {
            if (p.h) {
                $('.personhand_' + this.peer).css('display', 'flex');
            } else {
                $('.personhand_' + this.peer).css('display', 'none');

            }
        }
    }
}
var allowedpeers = [];
var deniedpeers = [];
class conn {
    constructor(peer, call) {
        this.call = call;
        this.peer = peer;
        if (allowedpeers.includes(peer)) {
            call.answer(thatstream); //answers call
        } else if (deniedpeers.includes(peer)) {
            //denies call
        } else {
            $('.popup-c').css('display', 'flex');
            gsap.to('.popup', {
                duration: 0.2,
                transform: 'scale(1)'
            });
            gsap.to('.popup-c', {
                duration: 0.2,
                opacity: 1
            });
            getname(peer, roomidd).then(function (n) {
                var el = $("<div class='person-connect conn_" + peer + "'><div class='person-connect-name'><span class='prcn'>" + n.name + "</span><span class='prcninfo'>Would Like To Connect To You</span><span class='prcninfon'>If You Deny, you won't be able to hear and see them</span><span class='prcninfon'>PeerID: " + peer + "</span></div><div class='person-connect-r'><div class='prc-acc'><div class='btn conn_acc_" + peer + "'><div>Accept</div></div></div><div class='prc-deny'><div class='btn conn_deny_" + peer + "'><div>Deny</div></div></div></div></div>")[0];
                $('.popup').append(el);
                $('.conn_acc_' + peer).on('click', function () {
                    allowedpeers.push(peer);
                    call.answer(thatstream);
                    if ($('.person-connect').length < 2) {
                        gsap.to('.popup', {
                            duration: 0.2,
                            transform: 'scale(0)'
                        });
                        gsap.to('.popup-c', {
                            duration: 0.2,
                            opacity: 0
                        });
                        setTimeout(function () {

                            $('.popup-c').css('display', 'none');
                        }, 200);
                    }
                    $('.conn_' + peer).remove();
                });
                $('.conn_deny_' + peer).on('click', function () {
                    deniedpeers.push(peer);
                    privateMessage(peer, {
                        type: 'INFO',
                        connDenied: true
                    })
                    if ($('.person-connect').length < 2) {
                        gsap.to('.popup', {
                            duration: 0.2,
                            transform: 'scale(0)'
                        });
                        gsap.to('.popup-c', {
                            duration: 0.2,
                            opacity: 0
                        });
                        setTimeout(function () {

                            $('.popup-c').css('display', 'none');
                        }, 200);
                    }
                    $('.conn_' + peer).remove();
                });
            });
        }

    }
    destroy() {
        if ($('.person-connect').length < 2) {
            gsap.to('.popup', {
                duration: 0.2,
                transform: 'scale(0)'
            });
            gsap.to('.popup-c', {
                duration: 0.2,
                opacity: 0
            });
            setTimeout(function () {

                $('.popup-c').css('display', 'none');
            }, 200);
        }
        $('.conn_' + peer).remove();
        delete this;
    }
}

function updateconnection(conn, sss) {
    var pr = conn.peer;
    conn.close();
    getConnect(pr);
}
var OnGoingCalls = {};

async function handleConnection(conn) {
    remotePeerIds.push(conn.peer); // Add remote peer to list
    remotePeerIds = remotePeerIds.filter(function (e) {
        return e !== peer.id
    });
    conn.on('open', function () {
        (async function () {
            connections.push(conn);

            streamChange();
            OnGoingCalls[conn.peer] = peer.call(conn.peer, thatstream);
            /*OnGoingCalls[conn.peer].on('stream', function (stream) {
                videls[conn.peer].update(stream);
            });
            OnGoingCalls[conn.peer].peerConnection.ontrack = function (track) {
                console.log(track);
                videls[conn.peer].update(track);
            };*/
            OnGoingCalls[conn.peer].peerConnection.ontrack = function (s) {
                console.log(s);
                videls[conn.peer].update(s);
            };
            /*OnGoingCalls[conn.peer].peerConnection.onconnectionstatechange = function (s) {
                console.log(s);
            };
            OnGoingCalls[conn.peer].peerConnection.ondatachannel = function (s) {
                console.log(s);
            };
            OnGoingCalls[conn.peer].peerConnection.onremovestream = function (s) {
                console.log(s);
            };
            OnGoingCalls[conn.peer].peerConnection.onaddstream = function (stream) {
                console.log(stream);
                //videls[conn.peer].stream(stream);
            };*/
            var audio = new Audio('notif.wav');
            audio.play();

            videls[conn.peer] = new Vid(conn.peer);
            people[conn.peer] = new person(conn.peer);
            selectpr[conn.peer] = new select(conn.peer);

            console.log("Connected with peer: " + conn.peer);
            conn.on('data', function (data) {
                // You can do whatever you want with the data from this connection - this is also the main part
                currentpacket[conn.peer] = data;
                people[conn.peer].update(data);
                videls[conn.peer].update(data);
            });
            conn.on('error', function () {
                // handle error 
                connectionError(conn);
            });

            conn.on('close', async function () {
                delete remotePeerIds[remotePeerIds.indexOf(conn.peer)];
                delete OnGoingCalls[conn.peer];
                remotePeerIds.filter(function (j) {
                    return j != null
                });
                videls[conn.peer].destroy();
                selectpr[conn.peer].destroy();
                people[conn.peer].destroy();
                delete selectpr[conn.peer];
                delete videls[conn.peer];
                delete connections[connections.indexOf(conn)];
                connections.filter(function (j) {
                    return j != null
                });
                // Handle connection closed
                //connectionClose(conn);
            });

        })();



    });
}

$('.chat-input').on('submit', function (e) {
    e.preventDefault();
    var v = e.currentTarget.chat.value.trim();

    if (v != '') {


        $('#chat')[0].value = '';
        var vv = $('#chatselect')[0].value;
        if (vv == 'e') {

            var p = {
                m: v,
                n: user.displayName + ' To Everyone',
                type: 'CHAT',
                pm: false
            };
            broadcastMessage(p);

            chatboxes.push(new chat({
                m: v,
                n: 'Me To Everyone',
                pm: false
            }));
        } else {
            getname(vv, roomidd).then(function (nn) {

                var p = {
                    m: v,
                    n: user.displayName + ' To You',
                    type: 'CHAT',
                    pm: true
                };
                privateMessage(vv, p);

                chatboxes.push(new chat({
                    m: v,
                    n: 'You To ' + nn.name,
                    pm: true
                }));
            });
        }



    } else {
        $('#chat').addClass('no');
        setTimeout(function () {
            $('#chat').removeClass('no');

        }, 500);
    }
});



function getname(peerid, rm) {
    return new Promise(function (resolve, reject) {
        calls.doc(rm).get().then(function (a) {
            a = a.data();
            a.users.forEach(function (item, i) {
                try {
                    if (item.peerId == peerid) {
                        resolve(item);
                    }
                } catch (e) {
                    console.log(e);
                    reject(e);
                }
            });
        });

    });
}
var screenstream;
var screenstreamactive = false;
var screenstreamn;
var myscreenprocess;
$('.sharescreen-c').on('click', async function () {
    try {
        screenstreamactive = screenstreamactive ^ 1;
        if (!screenstreamactive) {
            /*
                        thatstream.getTracks()[thatstream.getTracks().length-1].enabled=false;
                        thatstream.getTracks()[thatstream.getTracks().length-1].stop();
                       delete thatstream.getTracks()[thatstream.getTracks().length-1];*/

            clearInterval(myscreenshare);
            myscreenshare = null;
            var p = {
                type: 'SCREEN',
                active: false,
                pid: peer.id
            };
            /*
                        Object.keys(OnGoingCalls).forEach(function (I) {
                            var call = OnGoingCalls[I];
                            call.peerConnection.removeStream(screenstream);
                        });*/
            broadcastMessage(p);
            $('.screen-preview-c').css('display', 'none');
            $('#sharescreentxt').text('Share Screen');

            screenstreamn.getTracks().forEach(async function (track, i) {
                track.active = false;
                track.stop;
                delete screenstreamn.getTracks()[i];
            });
            screenstreamn = new MediaStream();
            /*
            screenstream = new MediaStream();
            var cc = [];

            connections.forEach(function (conn, i) {
                cc.push(conn.peer);
                conn.close();
                if (connections.length - 1 == i) {
                    connections = [];

                    cc.forEach(function (item, index) {
                        getConnect(item, true);

                        OnGoingCalls[item] = peer.call(item, thatstream);
                    });
                }
            });*/

        } else {

            navigator.mediaDevices.getDisplayMedia({
                video: true, // 720p 1280/720 640p 640x360
                audio: true
            }).then(function (stream) {
                screenstreamn = stream;
                $('#screensvid')[0].srcObject = stream;
                var ffps = 1; //times per second to send screendata
                myscreenprocess = setInterval(async function () {
                    var ctx = $('#screens')[0].getContext('2d');
                    ctx.drawImage($('#screensvid')[0], 0, 0, 853, 480); // 480p
                    //ctx.drawImage($('#screensvid')[0], 0, 0, 1280, 720); // 720p
                }, 1000 / ffps);

                setTimeout(function () {


                    var p = {
                        type: 'SCREEN',
                        active: true,
                        pid: peer.id
                    };
                    broadcastMessage(p);
                    myscreenshare = setInterval(function () {
                        var d = $('#screens')[0].toDataURL('image/jpeg', 0.7); //quality
                        fetch(d) // pass in some data-uri
                            .then(function (response) {
                                return response.arrayBuffer()
                            })
                            .then(function (buffer) {
                                var u8d = new Uint8Array(buffer);
                                broadcastMessage({
                                    data: u8d,
                                    type: 'SCREENSHARE'
                                });
                            });


                    }, 1000 / ffps);
                }, 10);
                $('#screen-preview-vid')[0].srcObject = screenstreamn;
                $('.screen-preview-c').css('display', 'flex');
                $('#sharescreentxt').text('Stop Screen Share');
                //add track to thatstream from screenstream

                //thatstream.addTrack(screenstream.getTracks()[0]);

                /*
                Object.keys(OnGoingCalls).forEach(async function (I) {
                    var call = OnGoingCalls[I];
                    call.peerConnection.addStream(screenstream);
                    console.log(call.peerConnection);
                });
                
                var cc = [];

                connections.forEach(function (conn, i) {
                    cc.push(conn.peer);
                    conn.close();
                    if (connections.length - 1 == i) {
                        connections = [];

                        cc.forEach(async function (item, index) {

                            getConnect(item, true);
                            console.log('WHAT IM SENDING');
                            console.log(thatstream.getTracks());
                            OnGoingCalls[item] = peer.call(item, thatstream);
                        });
                    }
                });
                */


            });

        }

    } catch (e) {
        console.log(e)
    }
});

class ScreenShare {
    constructor(pr) {

        this.peerID = pr;
        var peerID = pr;
        $('._ka' + this.peerID + '_screenshare').remove();
        var el = $('<div class="vi _ka' + this.peerID + '_screenshare"><div class="vvi"><div class="etiquette"><div class="et"><div class="_et' + this.peerID + '_screenshare"></div><div class="mutedaudsvg _ma' + this.peerID + '_screenshare"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10.8 4.9c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2l-.01 3.91L15 10.6V5c0-1.66-1.34-3-3-3-1.54 0-2.79 1.16-2.96 2.65l1.76 1.76V4.9zM19 11h-1.7c0 .58-.1 1.13-.27 1.64l1.27 1.27c.44-.88.7-1.87.7-2.91zM4.41 2.86L3 4.27l6 6V11c0 1.66 1.34 3 3 3 .23 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.55-.9l4.2 4.2 1.41-1.41L4.41 2.86z" /></div><div class="mutedvidsvg _mv' + this.peerID + '_screenshare"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9.56 8l-2-2-4.15-4.14L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21l1.41-1.41-8.86-8.86L9.56 8zM5 16V8h1.73l8 8H5zm10-8v2.61l6 6V6.5l-4 4V7c0-.55-.45-1-1-1h-5.61l2 2H15z" /></svg></div><div class="handsvg _hh' + this.peerID + '_screenshare"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M21,7c0-1.38-1.12-2.5-2.5-2.5c-0.17,0-0.34,0.02-0.5,0.05V4c0-1.38-1.12-2.5-2.5-2.5c-0.23,0-0.46,0.03-0.67,0.09 C14.46,0.66,13.56,0,12.5,0c-1.23,0-2.25,0.89-2.46,2.06C9.87,2.02,9.69,2,9.5,2C8.12,2,7,3.12,7,4.5v5.89 c-0.34-0.31-0.76-0.54-1.22-0.66L5.01,9.52c-0.83-0.23-1.7,0.09-2.19,0.83c-0.38,0.57-0.4,1.31-0.15,1.95l2.56,6.43 C6.49,21.91,9.57,24,13,24h0c4.42,0,8-3.58,8-8V7z M19,16c0,3.31-2.69,6-6,6h0c-2.61,0-4.95-1.59-5.91-4.01l-2.6-6.54l0.53,0.14 c0.46,0.12,0.83,0.46,1,0.9L7,15h2V4.5C9,4.22,9.22,4,9.5,4S10,4.22,10,4.5V12h2V2.5C12,2.22,12.22,2,12.5,2S13,2.22,13,2.5V12h2V4 c0-0.28,0.22-0.5,0.5-0.5S16,3.72,16,4v8h2V7c0-0.28,0.22-0.5,0.5-0.5S19,6.72,19,7L19,16z"/></svg></div></div></div><div class="vidd _aaa' + this.peerID + '_screenshare"><img class="_' + this.peerID + '_screenshare"/></div></div></div>')[0];

        $('.videos-c').append(el);
        //$('._' + this.peerID + '_screenshare')[0].srcObject = stream;
        calls.doc(roomidd).get().then(function (a) {
            a = a.data();
            a.users.forEach(function (item, i) {
                console.log(item.peerId)
                try {
                    if (item.peerId == peerID) {
                        $('._et' + peerID + '_screenshare').text(a.users[i].name + "'s Screen Share");
                    }
                } catch (e) {
                    console.log(e)
                }

            });
        });
    }
    destroy() {
        $('._ka' + this.peerID + '_screenshare').remove();
        delete this;
    }
    update(d) {
        var pid = this.peerID;
        var blob = new Blob([d],{type:'image/jpeg'});
        blobToDataURL(blob,function(b){
            $('._' + pid + '_screenshare')[0].src = b;
        });

    }
}
var DEBUG;
var screenshares = {};
var myscreenshare;
$('.videos-c')[0].onscroll = function () {
    $('.vi').each(function (i) {
        gsap.to(this, {
            duration: 0.5,
            transform: 'translateY(' + this.scrollTop + ')'
        });
    });
}
class Vid {
    constructor(peerID) {
        this.streamtracks = [];
        this.peerID = peerID;
        $('._ka' + this.peerID).remove();
        var el = $('<div class="vi _ka' + peerID + '"><div class="vvi"><div class="etiquette"><div class="et"><div class="_et' + peerID + '"></div><div class="mutedaudsvg _ma' + peerID + '"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10.8 4.9c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2l-.01 3.91L15 10.6V5c0-1.66-1.34-3-3-3-1.54 0-2.79 1.16-2.96 2.65l1.76 1.76V4.9zM19 11h-1.7c0 .58-.1 1.13-.27 1.64l1.27 1.27c.44-.88.7-1.87.7-2.91zM4.41 2.86L3 4.27l6 6V11c0 1.66 1.34 3 3 3 .23 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.55-.9l4.2 4.2 1.41-1.41L4.41 2.86z" /></div><div class="mutedvidsvg _mv' + peerID + '"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9.56 8l-2-2-4.15-4.14L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21l1.41-1.41-8.86-8.86L9.56 8zM5 16V8h1.73l8 8H5zm10-8v2.61l6 6V6.5l-4 4V7c0-.55-.45-1-1-1h-5.61l2 2H15z" /></svg></div><div class="handsvg _hh' + peerID + '"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M21,7c0-1.38-1.12-2.5-2.5-2.5c-0.17,0-0.34,0.02-0.5,0.05V4c0-1.38-1.12-2.5-2.5-2.5c-0.23,0-0.46,0.03-0.67,0.09 C14.46,0.66,13.56,0,12.5,0c-1.23,0-2.25,0.89-2.46,2.06C9.87,2.02,9.69,2,9.5,2C8.12,2,7,3.12,7,4.5v5.89 c-0.34-0.31-0.76-0.54-1.22-0.66L5.01,9.52c-0.83-0.23-1.7,0.09-2.19,0.83c-0.38,0.57-0.4,1.31-0.15,1.95l2.56,6.43 C6.49,21.91,9.57,24,13,24h0c4.42,0,8-3.58,8-8V7z M19,16c0,3.31-2.69,6-6,6h0c-2.61,0-4.95-1.59-5.91-4.01l-2.6-6.54l0.53,0.14 c0.46,0.12,0.83,0.46,1,0.9L7,15h2V4.5C9,4.22,9.22,4,9.5,4S10,4.22,10,4.5V12h2V2.5C12,2.22,12.22,2,12.5,2S13,2.22,13,2.5V12h2V4 c0-0.28,0.22-0.5,0.5-0.5S16,3.72,16,4v8h2V7c0-0.28,0.22-0.5,0.5-0.5S19,6.72,19,7L19,16z"/></svg></div></div></div><div class="vidd _aaa' + peerID + '"><video autoplay class="_' + peerID + '"></video></div></div></div>')[0];

        $('.videos-c').append(el);
        calls.doc(roomidd).get().then(function (a) {
            a = a.data();
            a.users.forEach(function (item, i) {
                console.log(item.peerId)
                try {
                    if (item.peerId == peerID) {
                        $('._et' + peerID).text(a.users[i].name);
                    }
                } catch (e) {
                    console.log(e);
                }

            });
        });

    }
    update(packet) {
        //var tk = generate_token(5);
        if (packet.type == 'MUTE') {
            if (packet.m) {
                $('._ma' + this.peerID).css('opacity', '1');
            } else {
                $('._ma' + this.peerID).css('opacity', '0.1');

            }
            if (packet.v) {
                $('._mv' + this.peerID).css('opacity', '1');

            } else {
                $('._mv' + this.peerID).css('opacity', '0.1');

            }

        } else if (packet.type == 'CHAT') {
            chatboxes.push(new chat(packet));
        } else if (packet.type == 'HAND') {
            if (packet.h) {

                $('._hh' + this.peerID).css('opacity', '1');
                $('._ka' + this.peerID).addClass('raise-hand-flex');
                $('._aaa' + this.peerID).addClass('raise-hand');
                var au = new Audio('hand.wav');
                au.play();
            } else {
                $('._hh' + this.peerID).css('opacity', '0.1');
                $('._ka' + this.peerID).removeClass('raise-hand-flex');
                $('._aaa' + this.peerID).removeClass('raise-hand');
            }
        } else if (packet.type == 'INFO') {
            if (packet.connDenied) {
                var pr = this.peerID;
                new noconnimg(pr, roomidd).then(function (ou) {

                    $('._aaa' + pr)[0].innerHTML = '<img src="' + ou + '" />';
                });
            }
        } else if (packet.type == 'SCREEN') {
            if (packet.active) {

                try {

                    screenshares[this.peerID] = new ScreenShare(this.peerID);
                } catch (e) {
                    console.log(e)
                };

            } else {
                try {
                    (async function () {
                        try {
                            screenshares[packet.pid].destroy();
                            delete screenshares[packet.pid];
                        } catch (e) {
                            console.log(e)
                        }

                    })();
                } catch (e) {
                    console.log(e)
                }

            }
        } else if (packet.type == 'SCREENSHARE') {

            screenshares[this.peerID].update(packet.data);

        } else {
            this.streamtracks.push(packet.track);

            //var vv = new MediaStream(this.streamtracks);
            var vv = packet.streams[0];

            $('._' + this.peerID)[0].srcObject = vv;

            var pid = this.peerID;
            (async function () {
                var stream = vv;
                const audioContext = new AudioContext();
                const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
                const analyserNode = audioContext.createAnalyser();
                mediaStreamAudioSourceNode.connect(analyserNode);

                const pcmData = new Float32Array(analyserNode.fftSize);
                const onFrame = () => {
                    analyserNode.getFloatTimeDomainData(pcmData);
                    let sumSquares = 0.0;
                    for (const amplitude of pcmData) {
                        sumSquares += amplitude * amplitude;
                    }
                    var vol = Math.sqrt(sumSquares / pcmData.length);
                    audios[new Date().getTime()] = vol;
                    var aA = 0;
                    if (Object.keys(audios).length > 5) {
                        aA = getmean(audios);
                        audios = {};
                        if (aA >= threshold) {
                            $('._aaa' + pid).addClass('talking');
                            $('._ka' + pid).addClass('raise-hand-flex');
                        } else {
                            $('._aaa' + pid).removeClass('talking');
                            $('._ka' + pid).removeClass('raise-hand-flex');
                        }
                    }
                    window.requestAnimationFrame(onFrame);
                };
                window.requestAnimationFrame(onFrame);
            })();

        }

    }
    destroy() {
        $('._ka' + this.peerID).remove();
        delete this;
    }
}