import React from 'react';

interface BeeProps {
    size?: number;
    className?: string;
}

const Bee: React.FC<BeeProps> = ({ size = 24, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`bee-svg ${className}`}
        >
            {/* Body */}
            <ellipse cx="12" cy="14" rx="4" ry="6" fill="currentColor" stroke="none" className="bee-body" />

            {/* Stripes */}
            <path d="M9 12h6" stroke="black" strokeWidth="1" />
            <path d="M8.5 15h7" stroke="black" strokeWidth="1" />
            <path d="M9.5 17h5" stroke="black" strokeWidth="1" />

            {/* Wings */}
            <path d="M12 10c-3-2-6-1-7 2 1 3 4 4 7 2" fill="rgba(255,255,255,0.4)" className="bee-wing-left" />
            <path d="M12 10c3-2 6-1 7 2-1 3-4 4-7 2" fill="rgba(255,255,255,0.4)" className="bee-wing-right" />

            {/* Antennas */}
            <path d="M10 8c-1-2-2-2-3-1" />
            <path d="M14 8c1-2 2-2 3-1" />

            {/* Sting */}
            <path d="M12 20l0 2" strokeWidth="1.5" />

            {/* Eyes */}
            <circle cx="10.5" cy="11.5" r="0.5" fill="black" />
            <circle cx="13.5" cy="11.5" r="0.5" fill="black" />
        </svg>
    );
};

export default Bee;
