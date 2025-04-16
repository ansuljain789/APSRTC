import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('message', formData.message);
    payload.append('access_key', '23636706-6cee-4539-9b94-1c0db7fcaf3d'); // ✅ Web3Form key here

    try {
      const res = await axios.post('https://api.web3forms.com/submit', payload);

      if (res.data.success) {
        setShowModal(true);
        resetForm();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <style>
        {`
        .contact-container {
          max-width: 800px;
          margin: auto;
          padding: 50px 20px;
          background: linear-gradient(to right, #dbeafe, #f0f9ff);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .contact-header h1 {
          color: #1e3a8a;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .contact-header p {
          color: #475569;
          font-size: 1.1rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group label {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #cbd5e1;
          border-radius: 12px;
          font-size: 1rem;
          background-color: #fff;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #3b82f6;
          outline: none;
        }

        .submit-btn {
          padding: 14px 25px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #2563eb;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #fff;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .modal-content h3 {
          color: #1e40af;
          margin-bottom: 10px;
        }

        .modal-content p {
          color: #475569;
        }

        .modal-close-btn {
          margin-top: 20px;
          background: #3b82f6;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
        }

        .modal-close-btn:hover {
          background: #2563eb;
        }

        .error-message {
          text-align: center;
          margin-top: 15px;
          color: red;
        }
      `}
      </style>

      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>Contact Us</h1>
          <p>Feel free to reach out — we’re here to help!</p>
        </motion.div>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit}
        >
          <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </motion.div>

          <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write your message..."
              rows="5"
              required
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {error && <p className="error-message">Something went wrong, please try again. ❌</p>}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: '-50px', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-30px', opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3>Success! 🎉</h3>
              <p>Your message was sent successfully.</p>
              <button className="modal-close-btn" onClick={closeModal}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactUs;
