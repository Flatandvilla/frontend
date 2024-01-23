


// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { fetchUrlData } from '../redux/lib/urlSearch';
// import { useNavigate } from 'react-router-dom';
// import { processKeyword } from '../redux/lib/querySlice';
// import KeywordTabs from '../components/keywordresearch/components/keyword/KeywordTabs';
// import UrlCaching from './UrlCaching';
// import QueryKeyword from '../components/Adding/QueryKeyword';

// export function Search({ formType }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [isKeywordLoading, setIsKeywordLoading] = useState(false);
//     const [isUrlLoading, setIsUrlLoading] = useState(false);
//     const [cachedData, setCachedData] = useState({ keyword: [], url: [] });
//     const { register: registerKeyword, handleSubmit: handleSubmitKeyword, reset: resetKeyword } = useForm();
//     const { register: registerURL, handleSubmit: handleSubmitURL, reset: resetURL } = useForm();
//     const [activeTab, setActiveTab] = useState(formType || "query");
//     const [lastSubmissionType, setLastSubmissionType] = useState(null);

//     useEffect(() => {
//         const keywordData = JSON.parse(localStorage.getItem('keywordResults')) || [];
//         console.log(keywordData)
//         const urlData = JSON.parse(localStorage.getItem('urlResults')) || [];
//         console.log(urlData)
//         setCachedData({ keyword: keywordData, url: urlData });
//     }, []);

//     const onKeywordSubmit = (data) => {
//         setIsKeywordLoading(true);
//         dispatch(processKeyword(data))
//             .unwrap()
//             .then(response => {
//                 const existingKeywords = JSON.parse(localStorage.getItem('keywordResults')) || [];
//                 existingKeywords.push(response);
//                 localStorage.setItem('keywordResults', JSON.stringify(existingKeywords));
//                 console.log('Keyword Results Cached:', existingKeywords);  // Logging the cached keyword results
//                 setCachedData(prev => ({ ...prev, keyword: existingKeywords }));
//                 navigate('/keywordquery', { state: { keywordData: response } });
//                 toast.success("Keyword processed successfully!");
//                 setLastSubmissionType('keyword');
//             })
//             .catch(error => {
//                 toast.error("Please add a valid keyword");
//             })
//             .finally(() => {
//                 resetKeyword();
//                 setIsKeywordLoading(false);
//             });
//     };
    

//     const onURLSubmit = (data) => {
//         setIsUrlLoading(true);
//         dispatch(fetchUrlData(data))
//             .unwrap()
//             .then(response => {
//                 const updatedUrls = [...cachedData.url, response];
//                 setCachedData(prev => ({ ...prev, url: updatedUrls }));
//                 localStorage.setItem('urlResults', JSON.stringify(updatedUrls));
//                 console.log('URL Results Cached:', updatedUrls);  // Logging the cached URL results
//                 navigate('/keywordresearch', { state: { urlData: response } });
//                 toast.success("URL processed successfully!");
//                 setLastSubmissionType('url');
//             })
//             .catch(error => {
//                 toast.error("Please add a valid URL");
//             })
//             .finally(() => {
//                 resetURL();
//                 setIsUrlLoading(false);
//             });
//     };
    

  
//     const tabsData = [
//         {
//             label: "Keyword",
//             value: "query",
//             onSubmit: handleSubmitKeyword(onKeywordSubmit),
//             register: registerKeyword,
//             placeholder: "Enter Keyword...",
//         },
//         {
//             label: "URL",
//             value: "url",
//             onSubmit: handleSubmitURL(onURLSubmit),
//             register: registerURL,
//             placeholder: "Enter URL...",
//         }
//     ];

//     useEffect(() => {
//         if (formType) {
//             setActiveTab(formType);
//         }
//     }, [formType]);
// console.log(cachedData.keyword);
// console.log(cachedData.url)
//     return (
       
//          <div>
//             {cachedData.keyword.length > 0 && (
//                 <>
//                     <KeywordTabs />
//                     <QueryKeyword />
//                 </>
//             )}
//             {cachedData.url.length > 0 && (
//                 <UrlCaching />
//             )}



//             {cachedData.keyword.length === 0 && cachedData.url.length === 0 && (
           
                // <div className="popup-container">
                //     <Tabs value={activeTab} onChange={setActiveTab}>
                //         <TabsHeader
                //             className="bg-transparent"
                //             indicatorProps={{
                //                 className: "bg-blue/20 border-b rounded-none border-blue !text-white shadow-none z-[10]",
                //             }}
                //         >
                //             {tabsData.map(({ label, value }) => (
                //                 <Tab
                //                     key={value}
                //                     value={value}
                //                     className={`${activeTab === value ? 'bg-lightblue text-black' : 'bg-white'}`}
                //                 >
                //                     {label}
                //                 </Tab>
                //             ))}
                //         </TabsHeader>
                //         <TabsBody>
                //             {tabsData.map(({ value, onSubmit, register, placeholder }) => (
                //                 <TabPanel key={value} value={value}>
                //                     <form onSubmit={onSubmit} className='mx-auto'>
                //                         <input
                //                             {...register(value)}
                //                             className="border-b border-gray-300 p-2 w-full"
                //                             placeholder={placeholder}
                //                         />
                //                         <button
                //                             type="submit"
                //                             disabled={value === "query" ? isKeywordLoading : isUrlLoading}
                //                             className={`bg-blue w-full text-center mt-3 flex items-center justify-center rounded-md mx-auto text-white p-2 ${value === "query" && isKeywordLoading ? 'opacity-50' : ''} ${value === "url" && isUrlLoading ? 'opacity-50' : ''}`}
                //                         >
                //                             {(value === "query" && isKeywordLoading) || (value === "url" && isUrlLoading) ? "Loading..." : 'Submit'}
                //                         </button>
                //                     </form>
                //                 </TabPanel>
                //             ))}
                //         </TabsBody>
                //     </Tabs>
                // </div>
//             )}
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
// } from "@material-tailwind/react";
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { fetchUrlData } from '../redux/lib/urlSearch';
// import { useNavigate } from 'react-router-dom';
// import { processKeyword } from '../redux/lib/querySlice';
// import useCachedData from '../hook/useCachedData';
// import KeywordTabs from '../components/keywordresearch/components/keyword/KeywordTabs';
// import QueryKeyword from '../components/Adding/QueryKeyword';
 import UrlCaching from './UrlCaching';

// export function Search({ closePopup }) {
//     const { cachedKeywordData, setCachedKeywordData, cachedUrlData, setCachedUrlData } = useCachedData();

//     const [activeTab, setActiveTab] = useState("query");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [isKeywordLoading, setIsKeywordLoading] = useState(false);
//     const [isUrlLoading, setIsUrlLoading] = useState(false);

//     const { register: registerKeyword, handleSubmit: handleSubmitKeyword, reset: resetKeyword } = useForm();
//     const { register: registerURL, handleSubmit: handleSubmitURL, reset: resetURL } = useForm();
    
//     const onKeywordSubmit = (data) => {
//         setIsKeywordLoading(true);
//         dispatch(processKeyword(data))
//             .unwrap()
//             .then(response => {
//                 localStorage.setItem('keywordResults', JSON.stringify(response));
//                 localStorage.removeItem('urlResults'); // Clear URL cache
//                 setCachedKeywordData(response); 
//                 console.log(cachedKeywordData)// Update keyword cache state
//                 setCachedUrlData(null); 
//                 navigate('/keywordquery', { state: { keywordData: response } });
//                 toast.success("Keyword processed successfully!");
//             })
//             .catch(error => {
//                 toast.error("Please add a valid keyword");
//             })
//             .finally(() => {
//                 resetKeyword();
//                 setIsKeywordLoading(false);
//             });
//     };
    
//     const onURLSubmit = (data) => {
//         setIsUrlLoading(true);
//         dispatch(fetchUrlData(data))
//             .unwrap()
//             .then(response => {
                
//                 localStorage.setItem('urlResults', JSON.stringify(response));
//                 localStorage.removeItem('keywordResults'); // Clear keyword cache
//                 setCachedUrlData(response); // Update URL cache state
//                 setCachedKeywordData(null);
//                 navigate('/keywordresearch', { state: { urlData: response } });
//                 toast.success("URL processed successfully!");



//             })
//             .catch(error => {
//                 toast.error("Please add a valid URL");
//             })
//             .finally(() => {
//                 resetURL();
//                 setIsUrlLoading(false);
//             });
//     };
    
//     const tabsData = [
//       {
//         label: "Keyword",
//         value: "query", 
//         onSubmit: handleSubmitKeyword(onKeywordSubmit),
//         register: registerKeyword,
//         placeholder: "Enter Keyword...",
//       },
//       {
//         label: "URL",
//         value: "url",
//         onSubmit: handleSubmitURL(onURLSubmit),
//         register: registerURL,
//         placeholder: "Enter URL...",
//       }
//     ];
//     const renderCachedData = () => {
//         if (cachedKeywordData && !cachedUrlData) {
//             // Only keyword data is cached, display keyword results
//             return (
//                 <div>
//                     <h3>Last Keyword Search:</h3>
//                     <KeywordTabs />
//                     <QueryKeyword />
//                 </div>
//             );
//         } else if (cachedUrlData && !cachedKeywordData) {
           
//             // Only URL data is cached, display URL results
//             return (
//                 <div>
//                     <h3>Last URL Search:</h3>
//                     <UrlCaching />
//                 </div>
//             );
//         }
//         return null; // No data is cached, nothing to render
//     };
//     return (
//         <div>
//             {renderCachedData() ? (
//                 renderCachedData()
//             ) : (
//                 <div className="popup-container">
//                 <Tabs value={activeTab} onChange={setActiveTab}>
//                     <TabsHeader
//                         className="bg-transparent"
//                         indicatorProps={{
//                             className: "bg-blue/20 border-b rounded-none border-blue !text-white shadow-none z-[10]",
//                         }}
//                     >
//                         {tabsData.map(({ label, value }) => (
//                             <Tab
//                                 key={value}
//                                 value={value}
//                                 className={`${activeTab === value ? 'bg-lightblue text-black' : 'bg-white'}`}
//                             >
//                                 {label}
//                             </Tab>
//                         ))}
//                     </TabsHeader>
//                     <TabsBody>
//                         {tabsData.map(({ value, onSubmit, register, placeholder }) => (
//                             <TabPanel key={value} value={value}>
//                                 <form onSubmit={onSubmit} className='mx-auto'>
//                                     <input
//                                         {...register(value)}
//                                         className="border-b border-gray-300 p-2 w-full"
//                                         placeholder={placeholder}
//                                     />
//                                     <button
//                                         type="submit"
//                                         disabled={value === "query" ? isKeywordLoading : isUrlLoading}
//                                         className={`bg-blue w-full text-center mt-3 flex items-center justify-center rounded-md mx-auto text-white p-2 ${value === "query" && isKeywordLoading ? 'opacity-50' : ''} ${value === "url" && isUrlLoading ? 'opacity-50' : ''}`}
//                                     >
//                                         {(value === "query" && isKeywordLoading) || (value === "url" && isUrlLoading) ? "Loading..." : 'Submit'}
//                                     </button>
//                                 </form>
//                             </TabPanel>
//                         ))}
//                     </TabsBody>
//                 </Tabs>
//             </div>
//             )}
//         </div>
//     );
    
// }





import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchUrlData } from '../redux/lib/urlSearch';
import { useNavigate } from 'react-router-dom';
import { processKeyword } from '../redux/lib/querySlice';
import useCachedData from '../hook/useCachedData';
import KeywordTabs from '../components/keywordresearch/components/keyword/KeywordTabs';
import QueryKeyword from '../components/Adding/QueryKeyword';

export function Search({ closePopup }) {
    const { cachedKeywordData, cachedUrlData } = useCachedData();
    const [activeTab, setActiveTab] = useState("query");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isKeywordLoading, setIsKeywordLoading] = useState(false);
    const [isUrlLoading, setIsUrlLoading] = useState(false);

    const { register: registerKeyword, handleSubmit: handleSubmitKeyword, reset: resetKeyword } = useForm();
    const { register: registerURL, handleSubmit: handleSubmitURL, reset: resetURL } = useForm();
    
    const onKeywordSubmit = (data) => {
        setIsKeywordLoading(true);
        dispatch(processKeyword(data))
            .unwrap()
            .then(response => {
                localStorage.setItem('keywordResults', JSON.stringify(response));
                navigate('/keywordquery', { state: { keywordData: response } });
                toast.success("Keyword processed successfully");
            })
            .catch(error => {
                toast.error("Please add a valid keyword");
            })
            .finally(() => {
                resetKeyword();
                setIsKeywordLoading(false);
            });
    };

    const onURLSubmit = (data) => {
        setIsUrlLoading(true);
        dispatch(fetchUrlData(data))
            .unwrap()
            .then(response => {
                localStorage.setItem('urlResults', JSON.stringify(response));
                navigate('/keywordresearch', { state: { urlData: response } });
                toast.success("URL processed successfully");
            })
            .catch(error => {
                toast.error("Please add a valid URL");
            })
            .finally(() => {
                resetURL();
                setIsUrlLoading(false);
            });
    };
    const tabsData = [
      {
        label: "Keyword",
        value: "query", 
        onSubmit: handleSubmitKeyword(onKeywordSubmit),
        register: registerKeyword,
        placeholder: "Enter Keyword...",
      },
      {
        label: "URL",
        value: "url",
        onSubmit: handleSubmitURL(onURLSubmit),
        register: registerURL,
        placeholder: "Enter URL...",
      }
    ];
    const renderCachedData = () => {
        return (
            <div>
                {cachedKeywordData && (
                    <div className='mt-[100px]'>
                      <div className='px-[100px] '>
                      <h4 className='font-bold text-3xl text-blue'>Last Keyword Search:</h4>
                      <KeywordTabs/>
                      <QueryKeyword/>

                        </div>
                    </div>
                )}
                {cachedUrlData && (
                    <div className='mt-[100px] '>
                                              <div className='w-[50%] px-[100px] '>

                        <h3 className='font-bold text-3xl text-blue'>Last URL Search:</h3>
</div>
                        <UrlCaching/>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div >
           
                {cachedKeywordData || cachedUrlData ? (
                    renderCachedData()
                ) : (
                    <div className="popup-container">
                  <div className="popup-wrapper relative">
                  {/* <button onClick={closePopup} className="close-btn">&times;</button> */}
  
                  <Tabs value={activeTab} onChange={setActiveTab}>
                   <TabsHeader
                        className="bg-transparent"
                        indicatorProps={{
                            className: "bg-blue/20 border-b rounded-none border-blue !text-white shadow-none z-[10]",
                        }}
                    >                        
                            {tabsData.map(({ label, value }) => (
                                <Tab key={value} value={value} className={`${activeTab === value ? 'bg-lightblue text-black' : 'bg-white'}`}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {tabsData.map(({ value, onSubmit, register, placeholder }) => (
                                <TabPanel key={value} value={value}>
                                    <form onSubmit={onSubmit} className='mx-auto'>
                                        <input
                                            {...register(value)}
                                            className="border-b border-gray-300 p-2 w-full"
                                            placeholder={placeholder}
                                        />
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={value === "query" ? isKeywordLoading : isUrlLoading}
                                                className={`bg-blue w-full text-center mt-3 flex items-center justify-center rounded-md mx-auto text-white p-2 ${value === "query" && isKeywordLoading ? 'opacity-50' : ''} ${value === "url" && isUrlLoading ? 'opacity-50' : ''}`}
                                            >
                                                {(value === "query" && isKeywordLoading) || (value === "url" && isUrlLoading) ? "Loading..." : 'Submit'}
                                            </button>
                                        </div>
                                    </form>
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                    </div>
                    </div>
                    
                )}
            </div>
       
    );
}
