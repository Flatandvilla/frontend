import React from 'react';
import { GrFormPreviousLink } from "react-icons/gr";

const FavouriteBookmark = ({ favorites, onBackClick }) => {
  const uniqueQueries = new Set();

  // Filter the favorites to include only unique queries
  const uniqueFavorites = favorites.filter(favorite => {
    const isUnique = !uniqueQueries.has(favorite.rank.query);
    uniqueQueries.add(favorite.rank.query);
    return isUnique;
  });

  return (
    <div>
      <div className="flex justify-start mb-4 bg-white w-7 h-8">
        <button 
          onClick={onBackClick}
        >
          <GrFormPreviousLink size={20} className=' text-white'/>
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-gray-800">Favorites Bookmarks:</h3>
      <ul className="list-none list-inside">
        {uniqueFavorites.map(favorite => (
          <div key={favorite.favo_id} className='flex justify-between items-center mb-3'>
            <a  href={favorite.rank.source_url}
             target="_blank" 
              className="text-gray-600">{favorite.rank.query}</a>
            <a href={favorite.rank.source_url} 
               className="text-white bg-blue rounded-md p-2 " 
               target="_blank" 
               rel="noopener noreferrer">
              {favorite.rank.target_url}
            </a>
            <h1>{favorite.rank.rank}</h1>

          </div>  
        ))}
      </ul>
    </div>
  );
};

export default FavouriteBookmark;
