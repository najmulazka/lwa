import { InlineWidget } from 'react-calendly';
import Header from '../fragments/Header';

function Booking() {
  return (
    <div>
      <Header />
      <div className="calendly-container">
        <InlineWidget url="https://calendly.com/techacademyapi/30min" />
      </div>
    </div>
  );
}

export default Booking;
