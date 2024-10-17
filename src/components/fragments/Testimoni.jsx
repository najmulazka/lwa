function Testimoni() {
  return (
    <div className="flex justify-center flex-col py-6 px-8 md:py-14 md:px-24">
      <div className="text-3xl font-bold mb-10 text-center">Kata Mereka Tentang Konsultasi LearnWithAndi</div>
      <div className="flex flex-wrap justify-center md:space-x-4">
        <ListTestimoni image="branding1.png" name="Anton" postition="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>

        <ListTestimoni image="branding1.png" name="Anton" postition="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>

        <ListTestimoni image="branding1.png" name="Anton" postition="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>

        <ListTestimoni image="branding1.png" name="Anton" postition="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>
      </div>
    </div>
  );
}

function ListTestimoni(props) {
  const { children, image, name, postition } = props;
  return (
    <div className="h-72 w-80 border shadow-md rounded-lg p-3 relative mb-4">
      <p>{children}</p>
      <div className="absolute bottom-4 left-4 flex space-x-2 items-center">
        <img src={image} alt="image" className="h-10 rounded-full" />
        <div className="">
          <p className="font-semibold">{name}</p>
          <p className="font-semibold">{postition}</p>
        </div>
      </div>
    </div>
  );
}

export default Testimoni;
