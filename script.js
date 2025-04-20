
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.forEach(nav => nav.classList.toggle('active'));
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.forEach(nav => nav.classList.remove('active'));
        });
    });
});
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.forEach(nav => nav.classList.toggle('active'));
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.forEach(nav => nav.classList.remove('active'));
        });
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.getElementById("cartButton");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.querySelector(".close-cart");
    const cartItems = document.getElementById("cartItems");
    const addToCartButtons = document.querySelectorAll(".cart");
    // Checkout functionality
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.querySelector('.close-checkout');
    const checkoutButton = document.getElementById('checkoutButton');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');
    const addressStep = document.getElementById('addressStep');
    const paymentStep = document.getElementById('paymentStep');
    const confirmationStep = document.getElementById('confirmationStep');
    const creditCardForm = document.getElementById('creditCardForm');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const orderIdElement = document.getElementById('orderId');

    let cart = [];


    cartButton.addEventListener("click", () => {
        cartOverlay.style.display = "flex";
        displayCart();
    });
    closeCart.addEventListener("click", () => {
        cartOverlay.style.display = "none";
    });

addToCartButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        const product = this.closest(".pro");
        if (!product) return;

        const productName = product.querySelector("h5")?.textContent || "Unknown Product";
        const productPriceText = product.querySelector(".des p")?.textContent || "Price: ₹0";
        const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, "")) || 0;
        const productImage = product.querySelector("img")?.src || "default-image.jpg";

        let existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ 
                name: productName, 
                price: productPrice, 
                image: productImage, 
                quantity: 1 
            });
        }

        
        alert(`"${productName}" has been added to your cart!`);
        
        displayCart();
    });
});
    
    function displayCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
    
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
    
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" width="50">
                    <p>${item.name}</p>
                    <p>Price: ₹${item.price.toFixed(2)}</p>
                    <p>Total: ₹${itemTotal.toFixed(2)}</p>
                    <button class="quantity-btn decrease-qty" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase-qty" data-index="${index}">+</button>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
        });
    
        cartItems.innerHTML += `<h3>Total Cart Price: ₹${totalPrice.toFixed(2)}</h3>`;
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".increase-qty").forEach(button => {
            button.addEventListener("click", function() {
                updateQuantity(parseInt(this.dataset.index), 1);
            });
        });
        
        document.querySelectorAll(".decrease-qty").forEach(button => {
            button.addEventListener("click", function() {
                updateQuantity(parseInt(this.dataset.index), -1);
            });
        });
        
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function() {
                removeItem(parseInt(this.dataset.index));
            });
        });
    }

    function updateQuantity(index, change) {
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity < 1) {
                cart.splice(index, 1);
            }
            displayCart();
        }
    }
    
    function removeItem(index) {
        cart.splice(index, 1);
        displayCart();
    }
        
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        checkoutModal.style.display = 'flex';
        showStep(addressStep);
    });


    closeCheckout.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    nextBtn.addEventListener('click', () => {
        const shippingForm = document.getElementById('shippingForm');
        if (shippingForm.checkValidity()) {
            showStep(paymentStep);
        } else {
            shippingForm.reportValidity();
        }
    });

    // Back button (from payment to address)
    backBtn.addEventListener('click', () => {
        showStep(addressStep);
    });


    placeOrderBtn.addEventListener('click', () => {
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        if (paymentMethod === 'credit') {
            
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || !expiryDate || !cvv) {
                alert('Please fill in all credit card details');
                return;
            }
            
            if (cardNumber.length !== 16) {
                alert('Please enter a valid 16-digit card number');
                return;
            }
        }
        
        
        processPayment();
    });


    continueShoppingBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';

        showStep(addressStep);
        
        cart = [];
        displayCart();
    });


    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            if (e.target.value === 'credit') {
                creditCardForm.style.display = 'block';
            } else {
                creditCardForm.style.display = 'none';
            }
        });
    });

    
    function showStep(step) {
        document.querySelectorAll('.checkout-step').forEach(s => {
            s.classList.remove('active');
        });
        step.classList.add('active');
    }

    
    function processPayment() {
        
        const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
        orderIdElement.textContent = orderId;
        
        
        showStep(confirmationStep);
        
        
    }

    
});

document.addEventListener('DOMContentLoaded', function() {
    
    const profileButton = document.querySelector('.navlinks li a');
    const profileOverlay = document.getElementById('profileOverlay');
    const closeProfile = document.querySelector('.close-profile');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const profileInfo = document.getElementById('profileInfo');
    const loginFormElement = document.getElementById('login');
    const signupFormElement = document.getElementById('signup');
    const logoutButton = document.getElementById('logoutButton');
    const userNameElement = document.getElementById('userName');

    profileButton.addEventListener('click', function(e) {
        e.preventDefault();
        profileOverlay.style.display = 'flex';
        checkLoginStatus();
    });

    
    closeProfile.addEventListener('click', function() {
        profileOverlay.style.display = 'none';
    });
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            checkLoginStatus();
            alert('Login successful!');
            profileOverlay.style.display = 'none';
        } else {
            alert('Invalid email or password');
        }
    });


    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        

        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        
        if (users.some(u => u.email === email)) {
            alert('User already exists');
            return;
        }
        
        // Add new user
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        checkLoginStatus();
        alert('Signup successful!');
        profileOverlay.style.display = 'none';
    });


    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        checkLoginStatus();
        profileOverlay.style.display = 'none';
    });

    
    function checkLoginStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'none';
            profileInfo.style.display = 'block';
            userNameElement.textContent = currentUser.name;
        } else {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            profileInfo.style.display = 'none';
        }
    }
    
    checkLoginStatus();
});
document.addEventListener('DOMContentLoaded', function() {
    
    const footerLinks = {
        'about': document.getElementById('aboutModal'),
        'privacy': document.getElementById('privacyModal'),
        'terms': document.getElementById('termsModal'),
        'contact': document.getElementById('contactModal')
    };

    const closeButtons = document.querySelectorAll('.close-modal');
document.querySelectorAll('#footer a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '' || 
            this.textContent.includes('About Us') || 
            this.textContent.includes('Privacy Policy') || 
            this.textContent.includes('Terms & Conditions') || 
            this.textContent.includes('Contact Us')) {
            e.preventDefault();
            
            const linkText = this.textContent.toLowerCase();
            
            if (linkText.includes('about')) {
                footerLinks.about.style.display = 'flex';
            } else if (linkText.includes('privacy')) {
                footerLinks.privacy.style.display = 'flex';
            } else if (linkText.includes('terms')) {
                footerLinks.terms.style.display = 'flex';
            } else if (linkText.includes('contact')) {
                footerLinks.contact.style.display = 'flex';
            }
        }
    });
});

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.footer-modal').style.display = 'none';
        });
    });

    Object.values(footerLinks).forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
});
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!email || !password) {
        alert('Please fill in both email and password fields');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
        alert('No account found with this email. Please sign up first.');
        return;
    }
    
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    checkLoginStatus();
    alert('Login successful!');
    profileOverlay.style.display = 'none';
});
if (!email) {
    document.getElementById('loginEmail').focus();
} else if (!password) {
    document.getElementById('loginPassword').focus();
} else if (!user) {
    document.getElementById('loginEmail').focus();
} else if (user.password !== password) {
    document.getElementById('loginPassword').focus();
    document.getElementById('loginPassword').value = ''; 
}

