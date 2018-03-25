/*
 *  A simple todo list app.
 *
 * @author Robbie
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDyAz3oJ-cxpsXVvTf5Ym_jmZXlfY0w2ZI",
    authDomain: "ubucr-b6290.firebaseapp.com",
    databaseURL: "https://ubucr-b6290.firebaseio.com",
    projectId: "ubucr-b6290",
    storageBucket: "",
    messagingSenderId: "656452602631"
};
// global access to initialized app database
var db = firebase.initializeApp(config).database();
// global reference to remote data
var ubuRef = db.ref('status');
// connect Firebase to Vue
Vue.use(VueFire);
var app = new Vue({
    // app initial state
    data: {
        newUbu: ''
    },
    firebase: {
        ubuStatus: ubuRef
    },
    computed: {
        currentMessage () {
            return this.ubuStatus.message;
        },
        currentTime () {
            return this.ubuStatus.date;
        },
        currentStatus() {
            return this.ubuStatus
        }
    },

    methods: {
        updateStatus (event) {
            var nowTime = Date();
            this.newUbu = this.newUbu.trim();
            ubuRef.child(event['.key']).update({ message: this.newUbu });
            ubuRef.child(event['.key']).update({ date: nowTime });
            this.newUbu= '';
        }  
    }
})

// mount
app.$mount('#ubuapp')