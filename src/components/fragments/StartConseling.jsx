function StartConseling() {
  return (
    <div className="bg-gray-200 py-6 md:py-14 px-8 md:px-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-3">Cara Memulai Konseling </h1>
      <p className="text-center">Memulai perjalanan karier Anda bersama Andi sangat mudah, ikuti langkah-langkah</p>
      <p className="text-center mb-10">berikut untuk memesan sesi konseling yang dipersnalisasi, kapan saja dan dimana saja.</p>

      <div className="grid grid-cols-3 space-x-3">
        <div className="flex flex-col items-center">
          <img src="/branding1.png" alt="image" className="w-96 h-48 mb-10 rounded-lg" />
          <h1 className="text-xl text-center mb-2">Book a session</h1>
          <p className="text-center text-sm">Pilih waktu yang sesuai untuk anda melalui jadwal online</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/branding1.png" alt="image" className="w-96 h-48 mb-10 rounded-lg" />
          <h1 className="text-xl text-center mb-2">Upload CV Kamu Melalui Form Booking</h1>
          <p className="text-center text-sm">Kirimkan CV dan informasi pentingmu untuk lebih memahami latar belakang dan situasi</p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/branding1.png" alt="image" className="w-96 h-48 mb-10 rounded-lg" />
          <h1 className="text-xl text-center mb-2">Join Video Call Session</h1>
          <p className="text-center text-sm">Ikuti pertemuan one on one melalui panggilan video untuk mendiskusikan tujuan dan tantangan karier kamu</p>
        </div>
      </div>
    </div>
  );
}

export default StartConseling;
