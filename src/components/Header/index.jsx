import React from 'react';
import "./index.css";

const Header = () => {
    return (
        <>
            <nav className="">
                <div className="mx-auto max-w-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="company_logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Header;