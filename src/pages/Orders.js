import React, { useState } from 'react';

const Orders = () => {
    const [orderDetails, setOrderDetails] = useState({
        chefId: '',
        customerName: '',
        address: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails),
            });
            const data = await response.json();
            alert(data.message || 'Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order');
        }
    };

    return (
        <div>
            <h2>Place an Order</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="chefId" placeholder="Chef ID" onChange={handleChange} required />
                <input type="text" name="customerName" placeholder="Your Name" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Delivery Address" onChange={handleChange} required />
                <input type="date" name="date" onChange={handleChange} required />
                <input type="time" name="time" onChange={handleChange} required />
                <button type="submit">Order Now</button>
            </form>
        </div>
    );
};

export default Orders;
