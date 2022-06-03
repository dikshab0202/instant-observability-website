import React from 'react';
import PropTypes from 'prop-types';

const TwitterSVG = ({
    width,
    height
}) => {
    return(
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M21.0678 0C22.6861 0 24 1.3139 24 2.93222V21.0678C24 22.6861 22.6861 24 21.0678 24H2.93222C1.3139 24 0 22.6861 0 21.0678V2.93222C0 1.3139 1.31386 0 2.93222 0H21.0678ZM9.16494 19.9005C15.5371 19.9005 19.0213 14.6204 19.0213 10.0442C19.0213 9.89334 19.0213 9.74244 19.0141 9.5988C19.6894 9.11028 20.2784 8.49966 20.7454 7.80282C20.1276 8.07582 19.4595 8.2626 18.7555 8.34882C19.4739 7.91772 20.0198 7.24248 20.2784 6.43068C19.6104 6.82578 18.8704 7.11318 18.0802 7.27122C17.448 6.59592 16.55 6.17922 15.5515 6.17922C13.6405 6.17922 12.0888 7.731 12.0888 9.64188C12.0888 9.91488 12.1175 10.1807 12.1822 10.4321C9.30144 10.2884 6.7512 8.90916 5.0414 6.81144C4.74685 7.3215 4.57444 7.91772 4.57444 8.54994C4.57444 9.7497 5.18508 10.8129 6.11898 11.4307C5.55145 11.4163 5.01985 11.2583 4.55287 10.9996V11.0428C4.55287 12.7238 5.74542 14.1175 7.33308 14.4407C7.04574 14.5198 6.7368 14.5629 6.42072 14.5629C6.198 14.5629 5.98252 14.5413 5.76698 14.4982C6.2052 15.8776 7.48392 16.8761 8.9997 16.9048C7.8144 17.8316 6.32016 18.3847 4.6966 18.3847C4.41642 18.3847 4.14342 18.3704 3.87042 18.3344C5.38622 19.3258 7.21092 19.9005 9.16494 19.9005Z" fill="#1D252C"/>
        </svg>
    );
};

TwitterSVG.protoTypes = {
    width: PropTypes.string,
    height: PropTypes.string
}

TwitterSVG.defaultProps = {
    width: '24',
    height: '24'
}

export default TwitterSVG;
