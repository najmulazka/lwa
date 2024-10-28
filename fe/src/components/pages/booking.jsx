import { InlineWidget } from 'react-calendly';
import Header from '../fragments/Header';

function Booking() {
  return (
    <div>
      <Header />
      <div className="">
        <InlineWidget url="https://calendly.com/najmulazka369/60min?month=2024-10&date=2024-10-29" />
      </div>
    </div>
  );
}

export default Booking;
