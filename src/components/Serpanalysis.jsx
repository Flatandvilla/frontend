import React, { useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Serpanalysis = ({ rowData }) => {
    const maxRank = 100;
    const rankPercentage = rowData ? (rowData.rank_abs / maxRank) * 100 : 0;
    // Assuming rank group also has a value between 1 and 100
    const rankGroupPercentage = rowData ? (rowData.rank / maxRank) * 100 : 0;

    // Define your custom colors here
    const pathColor = '#ba9934';
    const textColor = '#000000';
    const trailColor = '#d6d6d6';
    const [hoverRankGroup, setHoverRankGroup] = useState(false);
    const [hoverRankAbsolute, setHoverRankAbsolute] = useState(false);
    const CustomText = ({ isHovered, text, hoveredText }) => {
        return (
            <div
                className='  text-sm' >
                {isHovered ?
                    <span className='text-black bg-white shadow-md p-1  rounded-md
                     absolute  right-[50px] top-2  font-semibold text-center mx-auto  flex items-center 
                    justify-center'>{hoveredText}</span> :
                    <span className='text-black font-semibold text-center mx-auto' >{text}</span>
                }
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto">
            {rowData && (
                <div className="mb-6 p-4 border-b shadow-lg border-gray-300 
                rounded-lg flex justify-between">
                    {/* Left side content */}
                    <div>
                    <p className="font-bold text-lg mb-2 ">keyword:
                            <span className='text-blue font-semibold'> {rowData.query}</span>
                        </p>

                        <p className="font-bold text-lg mb-2 ">Type:
                            <span className='text-blue font-semibold'> {rowData.Type_rank}</span>
                        </p>
                        <p className="text-gray-600 mb-2 font-bold">Result State:
                            <span className='font-semibold'> {rowData.result_stat}</span>
                        </p>
                        <p className="text-gray-600 mb-2 font-bold">Breadcrumb:
                            <span className='font-semibold'> {rowData.breadcrumb}</span>
                        </p>
                    </div>




                    <div className=' p-3'>

                        <div className="flex items-center"
                            onMouseEnter={() => setHoverRankGroup(true)}
                            onMouseLeave={() => setHoverRankGroup(false)}>
                            <div className="w-20 h-24">
                                <CircularProgressbarWithChildren
                                    value={rankPercentage}
                                    styles={buildStyles({
                                        pathColor: pathColor,
                                        trailColor: trailColor,
                                    })}
                                >
                                    <CustomText
                                        isHovered={hoverRankGroup}
                                        text={rowData.rank}
                                        hoveredText="Rank Group"
                                    />
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                        <div className="flex items-center"
                            onMouseEnter={() => setHoverRankAbsolute(true)}
                            onMouseLeave={() => setHoverRankAbsolute(false)}>
                            <div className="w-20 h-24">
                                <CircularProgressbarWithChildren
                                    value={rankPercentage}
                                    styles={buildStyles({
                                        pathColor: pathColor,
                                        trailColor: trailColor,
                                    })}
                                >
                                    <CustomText
                                        isHovered={hoverRankAbsolute}
                                        text={rowData.rank_abs}
                                        hoveredText="Rank Absolute"
                                    />
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>

                    </div>
                </div>

            )}
        </div>
    );
}

export default Serpanalysis;
