import React, { useState } from 'react';

const LotteryTicketForm = () => {
  const [number, setNumber] = useState('777');
  const [isConfetti, setIsConfetti] = useState(false);

  const createConfetti = () => {
    setIsConfetti(true);
    const confettiCount = 100;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2 rounded-full';
      const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'];
      confetti.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      
      const startX = Math.random() * window.innerWidth;
      const startY = -10;
      const endY = window.innerHeight + 10;
      const rotation = Math.random() * 360;
      const duration = 1000 + Math.random() * 2000;
      
      confetti.style.left = `${startX}px`;
      confetti.style.top = `${startY}px`;
      confetti.style.transform = `rotate(${rotation}deg)`;
      container.appendChild(confetti);

      confetti.animate(
        [
          { transform: `translate(0, 0) rotate(${rotation}deg)` },
          { transform: `translate(${Math.random() * 200 - 100}px, ${endY}px) rotate(${rotation + 360}deg)` }
        ],
        {
          duration: duration,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }
      ).onfinish = () => {
        confetti.remove();
        if (container.children.length === 0) {
          container.remove();
          setIsConfetti(false);
        }
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfetti) {
      createConfetti();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex-grow flex justify-center">
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="text-center text-2xl font-bold w-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            min="1"
            max="999"
          />
        </div>
        <button 
          type="submit"
          className={`
            flex flex-col items-center
            bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-600 hover:to-pink-600 
            text-white font-semibold px-6 py-2 rounded-lg 
            transform transition hover:scale-105
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={isConfetti}
        >
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            Buy Lottery Ticket!
          </div>
          <span className="text-xs">
            (one ticket daily)
          </span>
        </button>
      </form>
    </div>
  );
};

export default LotteryTicketForm;