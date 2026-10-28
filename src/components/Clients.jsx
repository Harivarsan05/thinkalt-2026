"use client";

import Image from "next/image";

const clients = [
  { name: "Football News 365", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/Football-News-365-ThinkAlternate-client-08.png" },
  { name: "Givn", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/givn-thinkalternate-clients-08.png" },
  { name: "House of Creativity", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/house-of-creativity-thinkalternate-client-09.png" },
  { name: "iDare", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/iDare-logo-ThinkAlternate.jpg" },
  { name: "Dava Reco", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/Dava-Reco-ThinkAlternate-client05.png" },
  { name: "Daily Breath", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/Daily-Breath-ThinkAlternate-client04.png" },
  { name: "Antonio Boutique", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/AntonioBoutique-ThinkAlternate-client-03-1.png" },
  { name: "Ambi Sense", logo: "https://thinkalternate.com/wp-content/uploads/2025/08/Ambi-Sense-ThinkAlternate-client-02.png" },
];

export default function Clients() {
  return (
    <section className="relative overflow-hidden bg-white/80 backdrop-blur py-16 border-y border-white/40">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          height: 64px;
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
        @media (min-width: 640px) {
          .marquee-container {
            height: 80px;
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 8s linear infinite;
          gap: 3rem; /* 48px */
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .premium-topic-badge-wrapper {
          position: relative;
          padding: 1.5px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #105DA1, #1a73e8, #14b8a6, #105DA1);
          background-size: 200% auto;
          animation: borderGlowMove 4s linear infinite;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
          box-shadow: 0 4px 20px rgba(98, 206, 193, 0.15);
        }
        .premium-topic-badge-wrapper:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 30px rgba(98, 206, 193, 0.25);
          animation-duration: 2s;
        }
        .premium-topic-badge-inner {
          background: #ffffff;
          padding: 8px 24px;
          border-radius: 9999px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes borderGlowMove {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
 
      <div className="mx-auto flex max-w-[calc(100%-48px)] flex-col gap-8">
        <div className="flex items-center justify-center w-full">
          <div className="premium-topic-badge-wrapper">
            <div className="premium-topic-badge-inner">
              <p className="text-center text-base sm:text-lg font-bold leading-tight text-[#0d9488] m-0">
                Join 100+ satisfied clients who trusted us
              </p>
            </div>
          </div>
        </div>
 
        <div className="marquee-container h-16 sm:h-20">
          <div className="marquee-track">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="relative h-16 w-36 min-w-[144px] overflow-hidden grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  sizes="(max-width: 768px) 40vw, 144px"
                  className="object-contain"
                  priority={index < 4}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
