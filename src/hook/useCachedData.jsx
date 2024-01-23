
import { useState, useEffect } from 'react';

const useCachedData = () => {
  const [cachedKeywordData, setCachedKeywordData] = useState(null);
  const [cachedUrlData, setCachedUrlData] = useState(null);

  useEffect(() => {
    const keywordData = localStorage.getItem('keywordResults');
    const urlData = localStorage.getItem('urlResults');

    if (keywordData) setCachedKeywordData(JSON.parse(keywordData));
    if (urlData) setCachedUrlData(JSON.parse(urlData));
  }, []);

  return { cachedKeywordData, cachedUrlData };
};

export default useCachedData;
