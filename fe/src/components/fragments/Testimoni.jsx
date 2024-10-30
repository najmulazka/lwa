function Testimoni() {
  return (
    <div className="flex flex-col py-6 md:py-14">
      <div className="text-3xl font-bold mb-10 text-center">Kata Mereka Tentang Konsultasi LearnWithAndi</div>
      <div className="flex justify-center overflow-x-auto space-x-4">
        <ListTestimoni image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>

        <ListTestimoni image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>

        <ListTestimoni image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>

        <ListTestimoni image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </ListTestimoni>
      </div>
    </div>
  );
}

function ListTestimoni(props) {
  const { children, image, name, position } = props;
  return (
    <div id="testimoni" className="h-72 w-80 border shadow-md rounded-lg p-4 relative mb-4 bg-white flex-shrink-0">
      <p className="mb-4">{children}</p>
      <div className="absolute bottom-4 left-4 flex space-x-2 items-center">
        <img src={image} alt="image" className="h-10 w-10 rounded-full" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
}

export default Testimoni;
