
var currentMediaSession = null;
var currentVolume = 0.5;
var progressFlag = 1;
var mediaCurrentTime = 0;
var session = null;
var autoJoinPolicy = 'tab_and_origin_scoped';

(document).ready(function(){
                 
                 
/**
 * Call initialization
 */
                 if (!chrome.cast || !chrome.cast.isAvailable) {
                 setTimeout(initializeCastApi, 1000);
                 }
                 
/**
 * initialization
 */
                 function initializeCastApi() {
                 
                 
                 var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
                 var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
                                                           sessionListener,
                                                           receiverListener,
                                                           autoJoinPolicy);
                 
                 chrome.cast.initialize(apiConfig, onInitSuccess, onError);
                 };

                 
/**
 * session listener during initialization
 */
                 function sessionListener(e) {
                 console.log('New session ID: ' + e.sessionId);
                 session = e;
                 if (session.media.length != 0) {
                    onMediaDiscovered('onRequestSessionSuccess_', session.media[0]);
                 }
                 session.addMediaListener(
                    onMediaDiscovered.bind(this, 'addMediaListener'));
                    session.addUpdateListener(sessionUpdateListener.bind(this));
                 }
                 
/**
 * receiver listener during initialization
 */
                 function receiverListener(e) {
                 if( e === 'available' ) {
                 console.log("receiver found");
                 appendMessage("receiver found");
                 }
                 else {
                 console.log("receiver list empty");
                 appendMessage("receiver list empty");
                 }
                 }

                 
/**
 * launch app and request session
 */
                 function launchApp() {
                 console.log("launching app...");
                 appendMessage("launching app...");
                 chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
                 }
               
                 
});