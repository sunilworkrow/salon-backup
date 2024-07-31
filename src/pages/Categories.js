import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState(new Set(location.state?.selectedSubcategories || []));
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = [
    { name: 'Haircut', subcategories: ['Clipper Cut', 'Kids Haircut', 'Haircut', 'Bang Trim', 'Signature Haircut'] },
    { name: 'Cosmetology', subcategories: ['60 Minute Customized Facial', 'Moisturizing Facial', 'Hydrafacial', 'Anti-Aging Therapy'] },
    { name: 'Makeup', subcategories: ['Complimentary Touch-up', 'Everyday Makeup Application ', 'Formal Makeup Application', 'Cocktail Makeup'] }
  ];

  useEffect(() => {
    if (location.state?.selectedSubcategories) {
      setSelectedSubcategories(new Set(location.state.selectedSubcategories));
    }
  }, [location.state]);

  const toggleDropdown = (index) => {
    if (openCategory === index) {
      setOpenCategory(null);
    } else {
      setOpenCategory(index);
    }
  };

  const handleAddRemove = (subcategory) => {
    setSelectedSubcategories(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(subcategory)) {
        newSelection.delete(subcategory);
      } else {
        newSelection.add(subcategory);
      }
      return newSelection;
    });
  };

  const handleSubmit = () => {
    navigate('/selected', { state: { selectedSubcategories: Array.from(selectedSubcategories) } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(subcategory =>
      subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className='categorie-section py-5'>
      <div className="container">
        <h2 className='text-center mb-4'>All Services</h2>
        <div className="search-bar mb-4">
          <input
            type="text"
            placeholder="Search Categories..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        {filteredCategories.map((category, index) => (
          <div key={index} className="mb-4 categorie-pera">
            <div
              onClick={() => toggleDropdown(index)}
              className="d-flex justify-content-between items-center bg-gray-200 cursor-pointer px-4 pt-4"
            >
              <h2 className='categories-heading'>{category.name}</h2>
              <div>
                <IoIosArrowDown style={{ fontSize: '25px' }} />
              </div>
            </div>
            {openCategory === index && (
              <div className="bg-gray-100 subcategory-pera">
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="subcategory-box">
                    <div>
                      <h4>{subcategory}</h4>
                    </div>
                    <div>
                      <button
                        className='add-button'
                        style={{ opacity: selectedSubcategories.has(subcategory) ? 0.5 : 1 }}
                        onClick={() => handleAddRemove(subcategory)}
                      >
                        {selectedSubcategories.has(subcategory) ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="text-center mt-5">
          <button type="button" className='submit-button mt-3' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
