function LayananKonsultasi() {
  return (
    <div id="services" className="py-6 md:py-14 px-8 md:px-24 flex flex-col">
      <h1 className="text-3xl font-bold w-full md:w-1/2 leading-tight">Tingkatkan Karier Kamu dengan Layanan Konsultasi yang Menyeluruh dari LearnWithAndi</h1>
      <div className="flex flex-col-reverse md:flex-row ">
        <div className=" flex flex-col mt-14">
          <div className="w-full md:w-4/5">
            <ListLayanan title="Train Your Students">Bimbing siswa dengan strategi yang terbukti untuk mempersiapkan mereka menghadapi tantangan karier di masa depan.</ListLayanan>
            <ListLayanan title="Konsultasi Karier yang Dipersonalisasi">Bimbingan karier yang dirancang untuk membantu Kamu merancang strategi dan mencapai tujuan karier Kamu.</ListLayanan>
            <ListLayanan title="Optimalkan CV Kamu untuk Perekrut">Dapatkan bantuan untuk menonjolkan pengalaman dan keterampilan Anda dengan cara yang paling efektif.</ListLayanan>
            <ListLayanan title="Konsultasi Persiapan Wawancara Kerja">Dapatkan bantuan untuk menonjolkan pengalaman dan keterampilan Anda dengan cara yang paling efektif.</ListLayanan>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <img src="/branding1.png" alt="image" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ListLayanan(props) {
  const { title, children } = props;
  return (
    <div className="mb-5 md:mb-10">
      <div className="border shadow-md inline-block rounded-md py-1 px-2 font-semibold mb-2">
        <div className="inline mr-2">
          <i className="fa-duotone fa-solid fa-square text-gray-500"></i>
        </div>
        <p className="inline">{title}</p>
      </div>
      <div className="text-justify">{children}</div>
    </div>
  );
}

export default LayananKonsultasi;
