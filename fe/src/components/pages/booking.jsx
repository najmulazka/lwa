import { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import Header from '../fragments/Header';

function Booking() {
  const [showCalendly, setShowCalendly] = useState(false);

  const handleScheduleClick = () => {
    setShowCalendly(true); // Ubah state untuk menampilkan Calendly
  };

  return (
    <div>
      <Header />
      <button onClick={handleScheduleClick}>Click</button>

      {showCalendly && (
        <div className="calendly-container">
          <InlineWidget url="https://calendly.com/najmulazka369/60min?month=2024-10&date=2024-10-29" />
        </div>
      )}
    </div>
  );
}

export default Booking;
