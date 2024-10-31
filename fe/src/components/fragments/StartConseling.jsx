function StartConseling() {
  return (
    <div className="bg-gray-200 py-6 md:py-14 px-8 md:px-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-3">Cara Memulai Konseling </h1>
      <p className="text-center">Memulai perjalanan karier Anda bersama Andi sangat mudah, ikuti langkah-langkah</p>
      <p className="text-center mb-10">berikut untuk memesan sesi konseling yang dipersnalisasi, kapan saja dan dimana saja.</p>

      <div className="md:grid grid-cols-3 space-x-3">
        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-amber-200  rounded-lg">
            <img src="/startConseling1.png" alt="image" className="h-60"/>
          </div>
          <h1 className="text-xl text-center mb-2">Book a session</h1>
          <p className="text-center text-sm">Pilih waktu yang sesuai untuk anda melalui jadwal online</p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-indigo-300  rounded-lg">
            <img src="/startConseling2.png" alt="image" className="h-60"/>
          </div>
          <h1 className="text-xl text-center mb-2">Upload CV Kamu Melalui Form Booking</h1>
          <p className="text-center text-sm">Kirimkan CV dan informasi pentingmu untuk lebih memahami latar belakang dan situasi</p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-amber-200  rounded-lg">
            <img src="/startConseling3.png" alt="image" className="h-60"/>
          </div>
          <h1 className="text-xl text-center mb-2">Join Video Call Session</h1>
          <p className="text-center text-sm">Ikuti pertemuan one on one melalui panggilan video untuk mendiskusikan tujuan dan tantangan karier kamu</p>
        </div>
      </div>
    </div>
  );
}

export default StartConseling;
