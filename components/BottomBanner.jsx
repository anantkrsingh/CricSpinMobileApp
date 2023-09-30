import React, { useContext, useState } from 'react'
import { BsCaretRight } from 'react-icons/bs'
import { MyContext } from '../AppContext'

export const BottomBanner = () => {
    // const { bannerData } = useContext(MyContext)
    return (
        <div>
            <div className='flex z-10 items-center justify-center w-[375px] first-line:  self-center  pl-4 pr-4 fixed bottom-0  bg-[#513BB2] bg-opacity-60 md:left-0  md:w-[100vw]' >
            </div>

            {
                bannerData && <a target='_blank' href={bannerData[2].url}>

                    <img src={bannerData[2].image} />
                </a>
            }
        </div>
    )
}
