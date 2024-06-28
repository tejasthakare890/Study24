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
            const response = await fetch('http://127.0.0.1:5500/signup', { // Update URL to remote server address
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
            const response = await fetch('http://127.0.0.1:5500/login', { // Update URL to remote server address
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
            const response = await fetch('http://0.0.0.0:5500/logout', { // Update URL to remote server address
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


//chatbot
document.addEventListener('DOMContentLoaded', function () {
    const chatBtn = document.getElementById('chatBtn');
    const popup = document.getElementById('popup');
    const close = document.getElementById('close');
    const chatContent = document.getElementById('chatContent');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Predefined questions and answers
    const predefinedQuestions = [
        { id: "q", question: "What is your name?", answer: "I am a chatbot.", keywords: ["name"] },
        { id: "q", question: "How can I help you?", answer: "You can ask me anything.", keywords: ["help", "assistance"] },
        { id: "q", question: "What is Study24/7 ?", answer: "Study24/7 is an e-learning platform", keywords: ["study","Study","Study24","study24"] },
        { id: "q", question: "How do I access my courses on the Study24/7?", answer: " To access your courses, simply log in to your account using your registered email and password. Once logged in, you'll see a list of courses available to you ", keywords: ["Access","access","course","courses"] },
        { id: "q", question: "Can I access course materials offline? ", answer: " Yes, you can download course materials such as videos, documents, and quizzes for offline viewing. Look for the download option available within the course interface", keywords: ["Offline access","download materials","course interface"] },
        { id: "q", question: " Prerequisites are required  ?", answer: " Prerequisites are not required  ", keywords: ["Prerequisites","enrollment", "course description"] },
        { id: "q", question: " What payment methods are accepted for course enrollment?", answer: "We accept various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose the payment option that suits you best during the checkout process ", keywords: ["Payment methods ", " checkout process"] },
        { id: "q", question: " How can i login ?", answer: " You need to first  click on signup   and fill the form and submit and after that you need to login using the credentials entered while signup", keywords: ["signup","login", "Login Signup"] },
        
        // Add more predefined questions and answers here
    ];

    // Open popup when chat button is clicked
    chatBtn.addEventListener('click', function () {
        popup.style.display = 'block';
        displayLimitedQuestions();
    });

    // Close popup when close button is clicked
    close.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Display limited predefined questions in chat content
    function displayLimitedQuestions() {
        chatContent.innerHTML = '';
        for (let i = 0; i < 2; i++) {
            const questionObj = predefinedQuestions[i];
            const questionElement = createQuestionElement(questionObj);
            chatContent.appendChild(questionElement);
        }
    }

    // Create question element
    function createQuestionElement(questionObj) {
        const questionElement = document.createElement('div');
        questionElement.textContent = questionObj.question;
        questionElement.classList.add('question');
        questionElement.id = questionObj.id;
        questionElement.addEventListener('click', function () {
            displayUserMessage(questionObj.question);
            displayChatbotResponse(questionObj.answer);
        });
        return questionElement;
    }

    // Display user message
    function displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('chat-message');
        messageElement.classList.add('user-message');
        chatContent.appendChild(messageElement);
        // Scroll chat content to bottom
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Display chatbot response
    function displayChatbotResponse(response) {
        const messageElement = document.createElement('div');
        messageElement.textContent = response;
        messageElement.classList.add('chat-message');
        messageElement.classList.add('bot-message');
        chatContent.appendChild(messageElement);
        // Scroll chat content to bottom
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Send message
    sendBtn.addEventListener('click', function () {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            displayUserMessage(userMessage);
            let answered = false;
            predefinedQuestions.forEach(questionObj => {
                const foundKeyword = questionObj.keywords.find(keyword => userMessage.toLowerCase().includes(keyword));
                if (foundKeyword) {
                    displayChatbotResponse(questionObj.answer);
                    answered = true;
                }
            });
            if (!answered) {
                displayChatbotResponse("I'm sorry, I don't understand");
            }
            userInput.value = '';
        }
    });
});

// Feedback
document.getElementById('openPopupBtn1').addEventListener('click', function() {
    document.getElementById('feedbackPopup').style.display = 'block'; // Show the popup when the button is clicked
});

document.getElementById('closePopup1').addEventListener('click', function() {
    document.getElementById('feedbackPopup').style.display = 'none'; // Hide the popup when the close button is clicked
});

document.getElementById('feedbackForm1').addEventListener('submit', function(event) {
    event.preventDefault();
    const feedbackText = document.getElementById('feedbackText').value;
    
    // Send feedback to server using fetch API or XMLHttpRequest
    fetch('http://localhost:5500/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedbackText })
    })
    .then(response => {
        if (response.ok) {
            alert('Feedback submitted successfully!');
            document.getElementById('feedbackForm1').reset();
            document.getElementById('feedbackPopup').style.display = 'none';
        } else {
            alert('Error submitting feedback. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting feedback. Please try again later.');
    });
});

