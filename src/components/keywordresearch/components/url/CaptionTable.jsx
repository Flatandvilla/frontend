
import React from 'react';
import { useSelector } from 'react-redux';
const CaptionTable = () => {
    
  const urlData = useSelector(state => state.UrlSlice.data);

  return (
    
    <div className="overflow-x-auto mx-auto 
    lg:w-[80%] md:w-full md:mt-[1rem] text-center h-[400px] overflow-auto">

      <table className="min-w-full table-auto text-left">
        <thead className="bg-blue text-white">
          <tr>
            <th className="px-4 py-2">Caption Text</th>
          </tr>
        </thead>
        <tbody>
             {urlData && urlData.captions_text.map((caption, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-4 py-2">{caption}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaptionTable;
