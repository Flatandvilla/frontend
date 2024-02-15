import React from 'react';
import Select from 'react-select';

// Import your image files
import EGYPT from '../assets/images/EGYPT.png';
import USA from '../assets/images/USA.png';
import AE from '../assets/images/DUBAI.png';

const LocationFilter = ({ selectedLocationFilter, setSelectedLocationFilter }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
    }),
  };

  const LocationOption = ({ innerProps, label, image }) => (
    <div
      {...innerProps}
      className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
    >
      <span className="text-base">{label}</span>
    </div>
  );

  const locationOptions = [
    { value: 'US', label: 'USA', image: USA },
    { value: 'EG', label: 'Egypt', image: EGYPT },
    { value: 'AE', label: 'Dubai', image: AE },

  ];

  const handleChange = (selectedOption) => {
    setSelectedLocationFilter(selectedOption.value);
  };

  return (
    <Select
      options={locationOptions}
      value={locationOptions.find((option) => option.value === selectedLocationFilter)}
      onChange={handleChange}
      components={{ Option: LocationOption }}
      styles={customStyles}
    />
  );
};

export default LocationFilter;
