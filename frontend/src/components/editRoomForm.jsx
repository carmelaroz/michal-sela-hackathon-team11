import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editRoomForm.css';
import { useAuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
// Define your fields
const fields = [
  { label: "Hotel Name", name: "hotelName", placeholder: "Hotel Name" },
  { label: "Address", name: "address", type: "textarea", placeholder: "Street, City, Country" },
  { label: "Booking Link", name: "bookingLink", type: "url", placeholder: "https://booking.com/..." },
  { label: "Contact Name", name: "contactName", placeholder: "Full Name" },
  { label: "Contact Phone", name: "contactPhone", type: "tel", placeholder: "+1 234 567 890" },
];

export const EditRoomForm = () => {
    const { id } = useParams();
    const { username } = useAuthContext()
    const [form, setForm] = useState(
    fields.reduce((acc, item) => {
      acc[item.name] = '';
      return acc;
    }, {})
  );
 
  useEffect((
    () => {
axios.get('http://localhost:5000/api/safeplaces/'+ id)
.then((data) => {
    setForm({
        hotelName: data.data.hotelName,
        address: data.data.address,
        contactName: data.data.contactName,
        contactPhone: data.data.contactPhone,
        bookingLink: data.data.bookingLink
      });
//   setData(data.data);
})}), [])

  const [message, setMessage] = useState('');
  const navigate =
   useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    debugger;
    e.preventDefault();
    axios
      .patch('http://localhost:5000/api/safeplaces/' + id, form, { params: { username } })
      .then(() => {
        setMessage('Edited successfully');
        navigate('/');
      });
  };

  const handleDelete = () => {
    axios
      .delete('http://localhost:5000/api/safeplaces/' + id, { params: { username } })
      .then(() => {
        setMessage('Deleted successfully');
        navigate('/');
      });
  };

  return (
    <div className="edit-container">
      <h2 className="edit-heading">Edit Room</h2>
      <form onSubmit={handleEdit} className="add-room-form">
        {fields.map((field) =>
          field.type === 'textarea' ? (
            <textarea
              key={field.name}
              name={field.name}
              placeholder={field.placeholder || field.label}
              value={form[field.name]}
              onChange={handleChange}
              className={"login-input"}
            />
          ) : (
            <input
              key={field.name}
              type={field.type || 'text'}
              name={field.name}
              placeholder={field.placeholder || field.label}
              value={form?.[field.name]}
              onChange={handleChange}
              className={"login-input"}
            />
          )
        )}
        <button type="submit" className="edit-button">
          Edit
        </button>
        <div style={{display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1}}>
        <button type="button" className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" onClick={() => navigate('/')} className="back-button">
          ← Back
        </button>
        </div>
        {message && <p className="create-message">{message}</p>}
      </form>
    </div>
  );
};

export default EditRoomForm;