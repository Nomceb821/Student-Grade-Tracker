const registerForm =
    document.getElementById("registerForm");

const message =
    document.getElementById("message");

registerForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const { data, error } =
            await supabaseClient.auth.signUp({
                email,
                password
            });

        if (error) {

            message.textContent =
                error.message;

            return;
        }

        message.textContent =
            "Registration successful! Please check your email to verify your account.";
    }
);