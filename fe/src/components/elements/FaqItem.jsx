import { useState } from 'react';
function FaqItem(props) {
  const { question, description } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border border-gray-200 rounded-lg px-4 py-2 cursor-pointer m-2 ${isOpen ? '' : 'h-10'}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="flex space-x-2 items-center">
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <i className="fa-solid fa-chevron-down"></i>
        </span>
        <p className="text-gray-800 font-medium">{question}sdaf</p>
      </div>
      {isOpen && <div className="mt-2 text-gray-600 text-left">{description}</div>}
    </div>
  );
}

export default FaqItem;