import React from 'react';
import "./index.css";
import { Link } from 'react-router-dom';
import ArroIcon from '../../assets/Svg/ArrowIcon';

const index = () => {
    return (
        <>
            <ul>
                <li>
                <ArroIcon customClass="max-w-[50px]" />
                </li>

                <li>
                    {/* <Link to="/homepage">Home page</Link> */}
                </li>
            </ul>
        </>

    )
}

export default index