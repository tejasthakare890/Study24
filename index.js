// Select the cursor element
const crsrBlur = document.querySelector("#cursorBlur");

// Add event listener for mouse movement
document.addEventListener("mousemove", function(event) {
    // Update the position of the cursor element based on mouse coordinates
    crsrBlur.style.left = event.clientX - 10 + "px";
    crsrBlur.style.top = event.clientY - 10 + "px";
});


document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const signupBtn = document.getElementById('signupBtn');
    const signupModal = document.getElementById('signupModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const signupForm = document.getElementById('signupForm');
    const signupMessage = document.getElementById('signupMessage');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const logoutBtn = document.getElementById('logoutBtn');

    // Function to check if the user is logged in
    function checkLoggedIn() {
        // Assuming you have a session cookie named "sessionToken"
        const sessionToken = getCookie("sessionToken");
        return !!sessionToken; // Return true if session token exists, false otherwise
    }
    
    // Function to get cookie value by name
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    

    // Show/hide login/logout buttons based on login status
    function updateButtonVisibility() {
        const isLoggedIn = checkLoggedIn();
        console.log('Is Logged In:', isLoggedIn);
        if (isLoggedIn) {
            logoutBtn.style.display = 'block'; // Show logout button
            loginBtn.style.display = 'none'; // Hide login button
        } else {
            logoutBtn.style.display = 'none'; // Hide logout button
            loginBtn.style.display = 'block'; // Show login button
        }
    }
    
    updateButtonVisibility(); // Call initially to set button visibility

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    closeSignupModal.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const username = formData.get('signupUsername');
        const password = formData.get('signupPassword');
        const email = formData.get('signupEmail');

        if (!username || !password || !email) {
            signupMessage.textContent = 'Please fill in all fields.';
            signupMessage.style.color = 'red';
            return;
        }

        const data = { username, password, email };

        try {
            const response = await fetch('http://localhost:5500/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                signupMessage.textContent = result.message || 'Signup successful';
                signupMessage.style.color = 'green';
                updateButtonVisibility(); // Update button visibility after successful signup
            } else {
                signupMessage.textContent = result.error || 'Signup failed';
                signupMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            signupMessage.textContent = 'An error occurred while processing your request.';
            signupMessage.style.color = 'red';
        }
    });
// Login form submission handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5500/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            loginMessage.textContent = 'Login successful';
            loginMessage.style.color = 'green';
            updateButtonVisibility(); // Update button visibility after successful login
            loginModal.style.display = 'none'; // Hide the login modal

            // If a link was remembered, redirect to that link
            if (rememberedLink) {
                window.location.href = rememberedLink;
                rememberedLink = null; // Reset remembered link after redirection
            }
        } else {
            loginMessage.textContent = data.error || 'Login failed';
            loginMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        loginMessage.textContent = 'An error occurred. Please try again.';
        loginMessage.style.color = 'red';
    }
});

    
    // Add event listener for logout button click
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5500/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Logout Response:', response); // Log the response
            if (response.ok) {
                // Perform additional actions if logout is successful
                console.log('Logout successful');
                updateButtonVisibility(); // Update button visibility after successful logout
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    });

    // Smooth scrolling to section when clicking on navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add event listeners to each arrow link
   // Remembered link variable
   let rememberedLink = null;

   // Add event listeners to each arrow link
   const arrowLinks = document.querySelectorAll("#arrow1, #arrow2, #arrow3, #arrow4, #arrow5");
   arrowLinks.forEach(link => {
       link.addEventListener("click", function(event) {
           event.preventDefault(); // Prevent default link behavior

           // Check if the user is logged in
           if (checkLoggedIn()) {
               // User is logged in, open the link
               window.location.href = link.parentElement.href;
           } else {
               // User is not logged in, display login modal
               loginModal.style.display = "block";

               // Remember the link
               rememberedLink = link.parentElement.href;
           }
       });
   });
});



document.addEventListener("DOMContentLoaded", function() {
  const crsrBlur = document.querySelector("#cursorBlur");
  document.addEventListener("mousemove", function(event) {
    crsrBlur.style.left = event.clientX - 10 + "px";
    crsrBlur.style.top = event.clientY - 10 + "px";
  });

  const signupLink = document.getElementById("signupLink");
  const signupModal = document.getElementById("signupModal");

  signupLink.addEventListener("click", function(event) {
    event.preventDefault();
    signupModal.style.display = "block";
  });
});

document.addEventListener("DOMContentLoaded", function() {
const crsrBlur = document.querySelector("#cursorBlur");
document.addEventListener("mousemove", function(event) {
  crsrBlur.style.left = event.clientX - 10 + "px";
  crsrBlur.style.top = event.clientY - 10 + "px";
});

const loginLink = document.getElementById("loginLink");
const loginModal = document.getElementById("loginModal");

loginLink.addEventListener("click", function(event) {
  event.preventDefault();
  loginModal.style.display = "block";
});
});
