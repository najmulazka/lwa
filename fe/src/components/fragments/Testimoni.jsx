function Testimoni(props) {
  const { children } = props;
  return (
    <div className="flex flex-col py-6 md:py-14">
      <div className="text-3xl font-bold mb-10 text-center">Kata Mereka Tentang Konsultasi LearnWithAndi</div>
      <div className="flex justify-center overflow-x-auto space-x-4">{children}</div>
    </div>
  );
}

export default Testimoni;
