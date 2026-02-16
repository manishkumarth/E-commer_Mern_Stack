import BoysImg from '../assets/boys01.jpg';
import GirlsImg from '../assets/woman01.jpg';
import MenImg from '../assets/mens01.jpg';
import WomenImg from '../assets/girls02.jpg';

const Category = () => {
  const categories = [
    { id: 1, name: "Boys", image: BoysImg },
    { id: 2, name: "Girls", image: GirlsImg },
    { id: 3, name: "Men", image: MenImg },
    { id: 4, name: "Women", image: WomenImg },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-10 text-center">Category Feature's</h2>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer bg-white border rounded-xl p-6 flex flex-col items-center justify-center
                       shadow-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => console.log(cat.name)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-28 h-28 object-cover rounded-full mb-5 border-2 border-gray-200"
            />
            <p className="text-xl font-semibold text-gray-700">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
