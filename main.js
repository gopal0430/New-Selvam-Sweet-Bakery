// Force remove any white space at the top
$(document).ready(function() {
  // Remove any potential top space
  $('html, body').css({
    'margin-top': '0',
    'padding-top': '0',
    'overflow-x': 'hidden'
  });
  
  // Ensure marquee is exactly at the top
  $('.marquee-container').css({
    'top': '0',
    'margin-top': '0',
    'padding-top': '0'
  });
  
  // Force browser to recalculate layout
  setTimeout(function() {
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  }, 10);
});


const products = [
  { id: 1, name: 'Badusha', price: 220, image: 'images/Badusha.webp', featured: true },
  { id: 2, name: 'Laddu', price: 220, image: 'images/Ghee_Laddu_Sweets.webp', featured: true },
  { id: 3, name: 'Jangiri', price: 220, image: 'images/Jangiri_Sweets.webp', featured: true },
  { id: 4, name: 'Chandrakala', price: 220, image: 'images/Chandrakala_Sweets.webp', featured: false },
  { id: 5, name: 'Surya Kala', price: 220, image: 'images/Surya_Kala.jpg', featured: false },
  { id: 6, name: 'Mysore Pak', price: 220, image: 'images/Carrot_Mysore.webp', featured: false },
  { id: 7, name: 'Traditional Sweets Mixing', price: 220, image: 'images/Carrot-Mysore-Pak-Sweets_870x1131.webp', featured: true },
  { id: 8, name: 'Mini Jangiri', price: 280, image: 'images/Jangiri_Sweets.webp', featured: false },
  { id: 9, name: 'Special Laddu', price: 280, image: 'images/Carrot-Mysore-Pak-Sweets_870x1131.webp', featured: false },
  { id: 10, name: 'Mini Malai Kaja', price: 280, image: 'images/Carrot-Mysore-Pak-Sweets_870x1131.webp', featured: false },
  { id: 11, name: 'Mini Badusha', price: 280, image: 'images/MiniBadusha.webp', featured: false },
  { id: 12, name: 'Malai Kaja', price: 280, image: 'images/Carrot-Mysore-Pak-Sweets_870x1131.webp', featured: false },
  { id: 13, name: 'Ghee Mysore Pak', price: 280, image: 'images/Ghee_Mysore_pak.webp', featured: false },
  { id: 14, name: 'Lamba Jamun', price: 320, image: 'images/Lamba_Jamun.webp', featured: false },
  { id: 15, name: 'Gulab Jamun', price: 320, image: 'images/Gulab_Jamun.webp', featured: true },
  { id: 16, name: 'Makkan Peda', price: 320, image: 'images/Arcot_Makkan_Peda.webp', featured: false },
  { id: 17, name: 'Halwa', price: 320, image: 'images/Badami_Halwa.webp', featured: false },
  { id: 18, name: 'Milk Burfi', price: 320, image: 'images/Milk_Barfi.webp', featured: false },
  { id: 19, name: 'Spl Mixing Sweet 32', price: 320, image: 'images/Carrot-Mysore-Pak-Sweets_870x1131.webp', featured: false },
  { id: 20, name: 'Basundi', price: 360, image: 'images/Basundi_sweet.webp', featured: false },
  { id: 21, name: 'Rasagulla', price: 360, image: 'images/Rasgulla.webp', featured: false },
  { id: 22, name: 'Rasmalai', price: 360, image: 'images/Rasmalai.jpg', featured: false },
  { id: 23, name: 'Exquisite Kaju Sweet', price: 500, image: 'images/Carrot-Mysore-Pak-Sweets_870x1131.webp', featured: true },
  { id: 24, name: 'Kaju Sweet', price: 500, image: 'images/Kaju_Kathli.webp', featured: false }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];





/* -----------------------------------------------------------
   PRODUCT RENDERING
----------------------------------------------------------- */
function renderProducts(list) {
  const grid = $('#productsGrid');
  grid.empty();
  list.forEach(product => grid.append(createProductCard(product)));
}

function renderFeaturedProducts() {
  const featuredGrid = $('#featuredProducts');
  const featuredProducts = products.filter(product => product.featured);
  featuredGrid.empty();
  featuredProducts.forEach(product => featuredGrid.append(createProductCard(product)));
}

function createProductCard(product) {
  return $(`
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" class="product-img" />
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price"><span class="price">₹${product.price.toFixed(2)}</span></div>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `);
}

/* -----------------------------------------------------------
   MODAL FOR SIZE SELECTION
----------------------------------------------------------- */
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const basePrice = product.price;

  const modalBody = $(`
    <div class="modal-image">
      <img src="${product.image}" alt="${product.name}" class="product-img"/>
    </div>
    <h2 class="modal-title">${product.name}</h2>
    <div class="size-selector">
      <label><strong>Weight:</strong></label>
      <div class="size-options">
        <button class="size-btn" data-multiplier="1" data-label="1 Kg">1 Kg</button>
        <button class="size-btn" data-multiplier="0.5" data-label="500 grams">500 grams</button>
        <button class="size-btn" data-multiplier="0.25" data-label="250 grams">250 grams</button>
        <button class="size-btn" data-multiplier="0.1" data-label="100 grams">100 grams</button>
      </div>
    </div>
    <div class="product-price">
      <span class="price" id="modalPrice">₹${basePrice.toFixed(2)}</span>
    </div>
    <div class="quantity-selector">
      <label>Quantity:</label>
      <input type="number" class="quantity-input" value="1" min="1" max="50" id="modalQuantity">
    </div>
    <button class="cta-button" id="addToCartFromModal" 
      data-id="${product.id}" 
      data-price="${basePrice}" 
      data-weight="1 Kg"
      data-multiplier="1">
      Add to Cart
    </button>
  `);

  $('#modalBody').empty().append(modalBody);
  $('#productModal').addClass('active');

  // Set first size as active by default
  $('.size-btn').first().addClass('active');

  $('.size-btn').on('click', function() {
    $('.size-btn').removeClass('active');
    $(this).addClass('active');
    const multiplier = parseFloat($(this).data('multiplier'));
    const label = $(this).data('label');
    const newPrice = basePrice * multiplier;
    $('#modalPrice').text(`₹${newPrice.toFixed(2)}`);
    $('#addToCartFromModal')
      .data('price', newPrice)
      .data('weight', label)
      .data('multiplier', multiplier);
  });
}

/* -----------------------------------------------------------
   CART MANAGEMENT
----------------------------------------------------------- */
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));

  $('#cartCount').text(cart.reduce((sum, item) => sum + item.quantity, 0));

  const cartItems = $('#cartItems');
  cartItems.empty();

  if (cart.length === 0) {
    cartItems.html('<div class="empty-cart">Your cart is empty</div>');
    $('#cartTotal').text('₹0.00');
    return;
  }

  // 🧮 Define weight order for sorting
  const weightOrder = { "1 Kg": 1, "500 grams": 2, "250 grams": 3, "100 grams": 4 };

  // 🗂️ Sort by product name, then weight
  const sortedCart = [...cart].sort((a, b) => {
    const productA = products.find(p => p.id === a.id)?.name || "";
    const productB = products.find(p => p.id === b.id)?.name || "";
    if (productA === productB) {
      return (weightOrder[a.weight] || 99) - (weightOrder[b.weight] || 99);
    }
    return productA.localeCompare(productB);
  });

  let total = 0;

  sortedCart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = $(`
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name} — ${item.weight}</div>
          <div class="cart-item-price">
            ₹${item.price.toFixed(2)} × ${item.quantity} = ₹${itemTotal.toFixed(2)}
          </div>
          <div class="cart-item-quantity">
            <button class="qty-btn decrease-qty" data-id="${item.id}" data-weight="${item.weight}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn increase-qty" data-id="${item.id}" data-weight="${item.weight}">+</button>
            <button class="remove-item" data-id="${item.id}" data-weight="${item.weight}">Remove</button>
          </div>
        </div>
      </div>
    `);

    cartItems.append(cartItem);
  });

  $('#cartTotal').text(`₹${total.toFixed(2)}`);
}

/* -----------------------------------------------------------
   CART ACTIONS
----------------------------------------------------------- */
function updateQuantity(productId, change, weight) {
  const item = cart.find(i => i.id === productId && i.weight === weight);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => !(i.id === productId && i.weight === weight));
  }
  updateCart();
}

function removeFromCart(productId, weight) {
  cart = cart.filter(i => !(i.id === productId && i.weight === weight));
  updateCart();
}

/* -----------------------------------------------------------
   BEAUTIFUL ALERT MESSAGE SYSTEM
----------------------------------------------------------- */
function showAlert(title, message, type = 'success') {
    const alertOverlay = $('#customAlert');
    const alertBox = $('#customAlertBox');
    const alertIcon = $('#customAlertIcon');
    const alertTitle = $('#customAlertTitle');
    const alertMessage = $('#customAlertMessage');
    const alertButton = $('#customAlertButton');
    
    // Set content
    alertTitle.text(title);
    alertMessage.text(message);
    
    // Set type-specific styling
    alertBox.removeClass('alert-success alert-error alert-warning alert-info');
    alertBox.addClass(`alert-${type}`);
    
    // Set icon based on type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    alertIcon.removeClass('success error warning info');
    alertIcon.addClass(type);
    alertIcon.text(icons[type] || '✅');
    
    // Show alert
    alertOverlay.addClass('active');
    setTimeout(() => {
        alertBox.addClass('active');
    }, 50);
    
    // Focus the button for accessibility
    setTimeout(() => {
        alertButton.focus();
    }, 300);
}

function hideAlert() {
    const alertOverlay = $('#customAlert');
    const alertBox = $('#customAlertBox');
    
    alertBox.removeClass('active');
    setTimeout(() => {
        alertOverlay.removeClass('active');
    }, 300);
}

/* -----------------------------------------------------------
   CONTACT FORM WHATSAPP SUBMISSION
----------------------------------------------------------- */
function sendContactViaWhatsApp(formData) {
    const phone = '919600554330';
    
    const message = `*🏪 New Selvam Sweets - Contact Form Message*
    
👤 *Customer Details:*
• *Name:* ${formData.name}
• *Email:* ${formData.email}
• *Phone:* ${formData.phone}

💬 *Message:*
${formData.message}

📧 *Sent via Website Contact Form*`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/* -----------------------------------------------------------
   EVENT BINDINGS
----------------------------------------------------------- */
$(document).ready(function() {
  renderProducts(products);
  renderFeaturedProducts();
  updateCart();

  // Alert system initialization
  $('#customAlertButton').on('click', hideAlert);
  
  // Close alert when clicking outside
  $('#customAlert').on('click', function(e) {
      if (e.target === this) {
          hideAlert();
      }
  });
  
  // Close alert with Escape key
  $(document).on('keydown', function(e) {
      if (e.key === 'Escape' && $('#customAlert').hasClass('active')) {
          hideAlert();
      }
  });

  // Filter functionality
  $('.filter-btn').on('click', function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    const category = $(this).data('category');
    let filteredProducts = products;
    
    if (category !== 'all') {
      // For this demo, we'll filter by price ranges as we don't have categories
      if (category === 'sweets') {
        filteredProducts = products.filter(p => p.price <= 300);
      } else if (category === 'savouries') {
        filteredProducts = products.filter(p => p.price > 300 && p.price <= 400);
      } else if (category === 'hampers') {
        filteredProducts = products.filter(p => p.price > 400 && p.price <= 500);
      } else if (category === 'giftboxes') {
        filteredProducts = products.filter(p => p.price > 500);
      }
    }
    
    renderProducts(filteredProducts);
  });

  $(document).on('click', '.product-card', function(e) {
    if (!$(e.target).hasClass('add-to-cart-btn')) {
      openProductModal(parseInt($(this).data('id')));
    }
  });

  $(document).on('click', '.add-to-cart-btn', function(e) {
    e.stopPropagation();
    openProductModal(parseInt($(this).data('id')));
  });

  $(document).on('click', '#addToCartFromModal', function() {
    const id = parseInt($(this).data('id'));
    const price = parseFloat($(this).data('price'));
    const weight = $(this).data('weight');
    const quantity = parseInt($('#modalQuantity').val()) || 1;
    const existing = cart.find(i => i.id === id && i.weight === weight);

    if (existing) existing.quantity += quantity;
    else cart.push({ id, price, weight, quantity });

    updateCart();
    $('#productModal').removeClass('active');
  });

  $(document).on('click', '.increase-qty', function() {
    updateQuantity(parseInt($(this).data('id')), 1, $(this).data('weight'));
  });

  $(document).on('click', '.decrease-qty', function() {
    updateQuantity(parseInt($(this).data('id')), -1, $(this).data('weight'));
  });

  $(document).on('click', '.remove-item', function() {
    removeFromCart(parseInt($(this).data('id')), $(this).data('weight'));
  });

  $('#closeModal').on('click', () => $('#productModal').removeClass('active'));
  $('#cartToggle').on('click', () => {
    $('#cartSidebar').addClass('active');
    $('#cartOverlay').addClass('active');
  });
  $('#closeCart, #cartOverlay').on('click', () => {
    $('#cartSidebar').removeClass('active');
    $('#cartOverlay').removeClass('active');
  });

  // Explore Products button
  $('#exploreProducts').on('click', function() {
    document.getElementById('products').scrollIntoView({behavior: 'smooth'});
  });

  // Contact form submission with beautiful alerts
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = $(this).find('.cta-button');
    const originalText = submitBtn.text();
    
    // Show loading state
    submitBtn.text('Preparing WhatsApp...').prop('disabled', true);
    
    // Get form values
    const formData = {
        name: $('#contactName').val().trim(),
        email: $('#contactEmail').val().trim(),
        phone: $('#contactPhone').val().trim(),
        message: $('#contactMessage').val().trim()
    };
    
    // Validation
    let isValid = true;
    let errorMessage = '';
    let errorField = '';
    
    if (!formData.name) {
        isValid = false;
        errorMessage = 'Please enter your name.';
        errorField = 'contactName';
    } else if (!formData.email) {
        isValid = false;
        errorMessage = 'Please enter your email address.';
        errorField = 'contactEmail';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
        errorField = 'contactEmail';
    } else if (!formData.phone) {
        isValid = false;
        errorMessage = 'Please enter your phone number.';
        errorField = 'contactPhone';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid 10-digit phone number.';
        errorField = 'contactPhone';
    } else if (!formData.message) {
        isValid = false;
        errorMessage = 'Please enter your message.';
        errorField = 'contactMessage';
    }
    
    if (!isValid) {
        showAlert('Oops!', errorMessage, 'error');
        if (errorField) $(`#${errorField}`).focus();
        submitBtn.text(originalText).prop('disabled', false);
        return;
    }
    
    // Show loading alert
    showAlert('Almost Ready!', 'Preparing your message for WhatsApp...', 'info');
    
    // Small delay for better UX
    setTimeout(() => {
        hideAlert();
        
        // Send via WhatsApp
        sendContactViaWhatsApp(formData);
        
        // Show success message after a short delay
        setTimeout(() => {
            showAlert(
                'Perfect! 🎉', 
                `Thank you ${formData.name}! We're opening WhatsApp to send your message. Just click "Send" in WhatsApp to complete.`,
                'success'
            );
        }, 500);
        
        // Reset form
        this.reset();
        
        // Restore button
        submitBtn.text(originalText).prop('disabled', false);
    }, 2000);
  });

  // WhatsApp order message with correct price & weight (sorted same as cart)
  $('#placeOrder').on('click', function() {
    if (cart.length === 0) {
      showAlert('Empty Cart!', 'Your cart is empty! Please add some items before placing an order.', 'warning');
      return;
    }

    const phone = '919600554330';
    let total = 0;
    let orderDetails = '';

    // 🧮 Define weight order
    const weightOrder = { "1 Kg": 1, "500 grams": 2, "250 grams": 3, "100 grams": 4 };

    // 🗂️ Sort cart same as display order (by product name, then weight)
    const sortedCart = [...cart].sort((a, b) => {
      const productA = products.find(p => p.id === a.id)?.name || "";
      const productB = products.find(p => p.id === b.id)?.name || "";
      if (productA === productB) {
        return (weightOrder[a.weight] || 99) - (weightOrder[b.weight] || 99);
      }
      return productA.localeCompare(productB);
    });

    // 🧾 Build message in sorted order
    sortedCart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return;
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      orderDetails += `• ${product.name} — ${item.weight} — ₹${item.price.toFixed(2)} × ${item.quantity} = ₹${itemTotal.toFixed(2)}\n`;
    });

    const message = `Hello New Selvam Sweet & Bakery! I would like to order:\n\n${orderDetails}\nTotal: ₹${total.toFixed(2)}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
});