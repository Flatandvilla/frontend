import React from 'react';
import { useSelector } from 'react-redux';

const AltTable = () => {
  const urlData = useSelector(state => state.UrlSlice.data);

  if (!urlData || !urlData.alt_sample) {
    return null;
  }

  return (
    <div className="overflow-x-auto mx-auto lg:w-[80%] md:w-full md:mt-[1rem] text-center 
 overflow-auto">
      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue text-white">
          <tr>
            <th className="px-4 py-2">Alt</th>
            <th className="px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {urlData.alt_sample.map((item, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-4 py-2">{item.alt}</td>
              <td className="px-4 py-2">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AltTable;
