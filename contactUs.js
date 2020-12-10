//this script should be used after firebase scripts.
document.addEventListener("DOMContentLoaded", () => {
    console.log("entering in js file");


    //function to send data in firebase
    async function sendMessage(name, email, message) {
        // Add a new message entry to the Firebase database.
        if (navigator.onLine) {
            try {
                await firebase.firestore().collection('messages').add({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                document.getElementById("sendBtn").innerText = "Thank you.";

                setTimeout(function () {
                    resetFields();
                }, 2000);

            } catch (error) {
                console.log(error)
                resetFields();
                window.alert('Sorry, Could not save your message. Please try again');
            }

        } else {
            console.log("you are offline")

        }
    }

    function resetFields() {
        document.getElementById("sendBtn").innerText = "Send";
        document.getElementById("email").value = '';
        document.getElementById("name").value = '';
        document.getElementById("message").value = '';
    }


    document.getElementById("sendBtn").addEventListener("click", () => {

        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let message = document.getElementById("message").value;


        document.getElementById("sendBtn").innerText = "sending..";

        if (email !== "" && name !== "" && message !== "") {
            sendMessage(name, email, message);
        } else {
            window.alert('Please fill all the fields');

            setTimeout(function () {
                document.getElementById("sendBtn").innerText = "Send";

            }, 2000);
        }
    });
    function checkSetup() {
        if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
            window.alert('Please reload this tab');
        }
    }

    // Checks that Firebase has been imported.
    checkSetup();

});