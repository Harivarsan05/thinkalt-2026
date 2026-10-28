'use client';

import React from 'react';

const DiagonalBanner = ({ text = "Simplifying Tech To Empower Your Business Growth!" }) => {
  const repeatedText = Array.from({ length: 4 }, (_, index) => (
    <span className="inline-block mr-16" key={index}>{text}</span>
  ));

  return (
    <div className="w-full overflow-hidden bg-white py-8 relative">
      {/* Container for the diagonal banners */}
      <div className="relative h-40 flex items-center justify-center">
        
        {/* Black diagonal banner - text moving left-up to right-down */}
        <div className="absolute top-0 -left-[15%] w-[130%] h-1/3 bg-black transform -skew-y-3 flex items-center overflow-hidden">
          <div className="animate-diagonal-right-down whitespace-nowrap text-white text-2xl font-bold leading-none">
            {repeatedText}
          </div>
        </div>

        {/* Orange diagonal banner - text moving right-down to left-up */}
        <div className="absolute top-1/3 -left-[15%] w-[130%] h-1/3 bg-gradient-to-r from-[#4682B4] via-[#00CED1] to-[#48D1CC] transform -skew-y-3 flex items-center overflow-hidden">
          <div className="animate-diagonal-right-down-to-left-up whitespace-nowrap text-white text-2xl font-bold leading-none">
            {repeatedText}
          </div>
        </div>

        {/* Purple diagonal banner - text moving left-up to right-down */}
        <div className="absolute top-2/3 -left-[15%] w-[130%] h-1/3 bg-[#4682B4] transform -skew-y-3 flex items-center overflow-hidden">
          <div className="animate-diagonal-right-down whitespace-nowrap text-white text-2xl font-bold leading-none">
            {repeatedText}
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes diagonalRightDown {
          0% {
            transform: translate3d(-22%, 0, 0);
          }
          100% {
            transform: translate3d(8%, 0, 0);
          }
        }

        @keyframes diagonalLeftDown {
          0% {
            transform: translate3d(8%, 0, 0);
          }
          100% {
            transform: translate3d(-22%, 0, 0);
          }
        }

        @keyframes diagonalRightDownToLeftUp {
          0% {
            transform: translate3d(8%, 0, 0);
          }
          100% {
            transform: translate3d(-22%, 0, 0);
          }
        }

        .animate-diagonal-right-down {
          animation: diagonalRightDown 5s linear infinite;
          will-change: transform;
        }

        .animate-diagonal-left-down {
          animation: diagonalLeftDown 5s linear infinite;
          will-change: transform;
        }

        .animate-diagonal-right-down-to-left-up {
          animation: diagonalRightDownToLeftUp 5s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default DiagonalBanner;
