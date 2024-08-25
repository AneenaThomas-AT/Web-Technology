import React, { useState } from 'react';
import './App.css';


function App() {
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [menuItem, setMenuItem] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const menuItems = ["Chicken Briyani", "Fish Briyani", "Mutton briyani", "Fried Rice", "Hyderbad Dum Briyani"];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{10}$/.test(contactNumber)) {
      alert('Contact number must be exactly 10 digits.');
      return;
    }

    if (itemQuantity > 2) {
      alert('Item quantity must not exceed 2.');
      return;
    }

    if (!termsChecked) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    alert(`Order placed successfully!\n\nCustomer Name: ${customerName}\nContact Number: ${contactNumber}\nMenu Item: ${menuItem}\nQuantity: ${itemQuantity}\nSpecial Instructions: ${specialInstructions || 'None'}\nTotal Items Ordered: ${itemQuantity}`);
    
    // Reset form fields after submission
    resetForm();
  };

  const resetForm = () => {
    setCustomerName('');
    setContactNumber('');
    setMenuItem(''); // Reset menuItem to an empty string
    setItemQuantity(1);
    setSpecialInstructions('');
    setTermsChecked(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Paradise of Briyani</h1>
      </header>

      <main>
        <section className="order-form">
          <h2>Place Your Order</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              required
            />

            <label htmlFor="menuItem">Menu Item:</label>
            <select
              id="menuItem"
              name="menuItem"
              value={menuItem}
              onChange={(e) => setMenuItem(e.target.value)}
              required
            >
              <option value="" disabled>Select a menu item</option>
              {menuItems.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <label htmlFor="itemQuantity">Item Quantity:</label>
            <input
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              min="1"
              max="3"
              required
            />

            <label htmlFor="specialInstructions">Special Instructions:</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Enter any special instructions"
            />

            {/* Terms and Conditions Checkbox */}
            <div className="terms">
  <input
    type="checkbox"
    id="termsCheckbox"
    name="termsCheckbox"
    checked={termsChecked}
    onChange={(e) => setTermsChecked(e.target.checked)}
    required
  />
  <label htmlFor="termsCheckbox">
    I agree to the <a href="/terms">Terms and Conditions</a>
  </label>
</div>


            <div className="button-group">
              <button type="submit">Order Now</button>
              <button type="reset" onClick={resetForm}>Reset</button>
            </div>
          </form>
        </section>

        <section className="gallery">
          <h2>Popular Dishes</h2>
          <div className="image-gallery">
            <img src="dish1.jpg" alt="Dish 1" />
            <img src="dish2.jpg" alt="Dish 2" />
            <img src="dish3.jpg" alt="Dish 3" />
            <img src="dish4.jpg" alt="Dish 4" />
            <img src="dish5.jpg" alt="Dish 5" />
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Paradise Of Briyani. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
