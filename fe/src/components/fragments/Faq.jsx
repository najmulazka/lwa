function Faq(props) {
  const { children } = props;
  return (
    <div className="py-6 md:py-14 px-8 md:px-24 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-3">Pertanyaan yang Sering Diajukan (FAQ)</h1>
      <div className="md:w-3/5 md:mb-20 mb-10">
        <p className="text-center">Kamu mungkin memiliki beberapa pertanyaan sebelum memulai. Berikut adalah jawaban untuk beberapa pertanyaan yang sering diajukan mengenai layanan LearnWithAndi:</p>
      </div>

      <div className="w-full md:grid md:grid-cols-2">{children}</div>
    </div>
  );
}

export default Faq;
