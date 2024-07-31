import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SelectedCategories.css';
import { CiEdit } from "react-icons/ci";

const SelectedCategories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubcategories: initialSelectedSubcategories } = location.state || { selectedSubcategories: [] };

  const subcategoryPrices = {
    'Clipper Cut': 25,
    'Kids Haircut': 20,
    'Haircut': 30,
    'Bang Trim': 15,
    'Signature Haircut': 35,
    '60 Minute Customized Facial': 60,
    'Moisturizing Facial': 50,
    'Hydrafacial': 75,
    'Anti-Aging Therapy': 70,
    'Complimentary Touch-up': 10,
    'Everyday Makeup Application ': 40,
    'Formal Makeup Application': 60,
    'Cocktail Makeup': 50
  };

  const calculateTotalAmount = (subcategories, quantities) => {
    return subcategories.reduce((total, subcategory) => {
      return total + (subcategoryPrices[subcategory] || 0) * (quantities[subcategory] || 1);
    }, 0);
  };

  const [selectedSubcategories, setSelectedSubcategories] = useState(initialSelectedSubcategories);
  const [quantities, setQuantities] = useState(
    initialSelectedSubcategories.reduce((acc, subcategory) => {
      acc[subcategory] = 1;
      return acc;
    }, {})
  );
  const [totalAmount, setTotalAmount] = useState(calculateTotalAmount(initialSelectedSubcategories, quantities));
  const [isEditing, setIsEditing] = useState(false);
  const [showQuantityControls, setShowQuantityControls] = useState(
    initialSelectedSubcategories.reduce((acc, subcategory) => {
      acc[subcategory] = false;
      return acc;
    }, {})
  );

  const handleAddMore = () => {
    navigate('/home', { state: { selectedSubcategories } });
  };

  const handleEditTotalAmount = () => {
    setIsEditing(true);
  };

  const handleTotalAmountChange = (event) => {
    setTotalAmount(event.target.value);
  };

  const handleSaveTotalAmount = () => {
    setIsEditing(false);
  };

  const handleRemoveSubcategory = (subcategory) => {
    const updatedSubcategories = selectedSubcategories.filter(item => item !== subcategory);
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[subcategory];
    setSelectedSubcategories(updatedSubcategories);
    setQuantities(updatedQuantities);
    setTotalAmount(calculateTotalAmount(updatedSubcategories, updatedQuantities));
  };

  const handleIncrement = (subcategory) => {
    const updatedQuantities = { ...quantities, [subcategory]: (quantities[subcategory] || 1) + 1 };
    setQuantities(updatedQuantities);
    setTotalAmount(calculateTotalAmount(selectedSubcategories, updatedQuantities));
  };

  const handleDecrement = (subcategory) => {
    if (quantities[subcategory] > 1) {
      const updatedQuantities = { ...quantities, [subcategory]: quantities[subcategory] - 1 };
      setQuantities(updatedQuantities);
      setTotalAmount(calculateTotalAmount(selectedSubcategories, updatedQuantities));
    }
  };

  const handleShowQuantityControls = (subcategory) => {
    setShowQuantityControls({ ...showQuantityControls, [subcategory]: true });
  };

  return (
    <div className='selected-categories-section py-5'>
      <div className="container">
        <h2 className='text-center mb-4'>Selected Services</h2>
        <div className="text-end mt-5">
          <button type="button" className='submit-button my-3' onClick={handleAddMore}>Add More</button>
        </div>
        <div className='selected-list'>
          {selectedSubcategories.length > 0 ? (
            selectedSubcategories.map((subcategory, index) => (
              <div key={index} className='subcategory-item'>
                <h2 className='categories-heading'>{subcategory}</h2>
                <div className='d-flex align-items-center'>
                  <h5 className='subcategory-price mb-0 text-danger mx-2'>
                    ${subcategoryPrices[subcategory] * (quantities[subcategory] || 1)}
                  </h5>
                  {showQuantityControls[subcategory] ? (
                    <div className='quantity-controls d-flex align-items-center'>
                      <button className='mx-2 rounded-circle border border-warning-subtle px-2' onClick={() => handleDecrement(subcategory)}>-</button>
                      <span>{quantities[subcategory]}</span>
                      <button className='mx-2 rounded-circle border border-warning-subtle px-2' onClick={() => handleIncrement(subcategory)}>+</button>
                    </div>
                  ) : (
                    <button className='mx-2 rounded-circle border border-warning-subtle px-2' onClick={() => handleShowQuantityControls(subcategory)}>+</button>
                  )}
                  <button className='add-button' onClick={() => handleRemoveSubcategory(subcategory)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center'>No subcategories selected.</p>
          )}
        </div>
        <div className="total-amount-section mt-4">
          <h4 className='text-end'>
            Total Amount: {isEditing ? (
              <>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={handleTotalAmountChange}
                  className='total-amount-input'
                />
                <button onClick={handleSaveTotalAmount} className='save-button ms-2'>Save</button>
              </>
            ) : (
              <>
                ${totalAmount}
                <CiEdit onClick={handleEditTotalAmount} className='ms-2 edit-icon' />
              </>
            )}
          </h4>
        </div>
        <div className="text-left mt-5">
          <button type="button" className='submit-button mt-3'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default SelectedCategories;
