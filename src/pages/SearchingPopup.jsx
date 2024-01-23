
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

export function SearchingPopup({ formType, closePopup }) {

    const { cachedKeywordData, cachedUrlData } = useCachedData();
    const [activeTab, setActiveTab] = useState(formType || "query");
    
    let cachedContentType;
    if (cachedKeywordData) {
        cachedContentType = 'keyword';
    } else if (cachedUrlData) {
        cachedContentType = 'url';
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isKeywordLoading, setIsKeywordLoading] = useState(false);
    const [isUrlLoading, setIsUrlLoading] = useState(false);

    const { register: registerKeyword, handleSubmit: handleSubmitKeyword, reset: resetKeyword } = useForm();
    const { register: registerURL, handleSubmit: handleSubmitURL, reset: resetURL } = useForm();
    const hasCachedData =  (cachedKeywordData || cachedUrlData);
console.log(hasCachedData)
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
  
    useEffect(() => {
        if (formType) {
          setActiveTab(formType); // Set the active tab based on the form type
        }
      }, [formType]);
    return (
        <div >
         
                
                  
                         <div  className="popup-container ">
                    <Tabs value={activeTab} onChange={setActiveTab} >
                       
                              <TabsHeader
        className="bg-transparent "
        indicatorProps={{
          className: "bg-blue/20  border-b rounded-none  border-blue !text-white shadow-none  z-[10]",
        }}
      >
        {tabsData.map(({ label, value }) => (
          <Tab 
            key={value} 
            value={value}
            className={`${activeTab === value ? 'bg-lightblue text-black' : 'bg-white'}`}
          >
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
    );
}
