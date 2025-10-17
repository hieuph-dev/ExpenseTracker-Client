import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { ComicText } from '../ui/comic-text'

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)

    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu)
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className='text-2xl' />
                ) : (
                    <HiOutlineMenu className='text-2xl' />
                )}
            </button>
            <div className='-mt-1 '>
                <ComicText
                    fontSize={2.5}
                    backgroundColor='var(--color-violet-500)'
                    dotColor='white'
                >
                    Expense Track
                </ComicText>
            </div>

            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar
