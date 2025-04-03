import { Link } from "react-router-dom";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";

interface ServiceCard {
  title: string;
  imageUrl: string;
  description: string; // Added a description for each service
}

// Services data with longer descriptions
const servicesData: ServiceCard[] = [
  {
    title: "Web Development",
    imageUrl: img1,
    description:
      "While Web Development is essential for businesses today, many developers struggle to create responsive, fast, and user-friendly websites. It's common to see delayed projects, poor design choices, and frustrating user experiences.",
  },
  {
    title: "Logo Design",
    imageUrl: img2,
    description:
      "Logo Design can often miss the mark, with many designers creating generic, uninspired logos that lack creativity. Too often, logos don't capture the true essence of a brand, leaving businesses with a lackluster identity.",
  },
  {
    title: "SEO",
    imageUrl: img1,
    description:
      "SEO practices are frequently oversold, leading to long-term ineffective results. Many businesses find themselves stuck in a cycle of constantly changing strategies without achieving meaningful improvements in their search rankings.",
  },
  {
    title: "Video Editing",
    imageUrl: img2,
    description:
      "Video Editing can be a painstaking process, often taking too long and yielding poor-quality results. It's frustrating when the editing doesn't match the vision of the original content, and the final product ends up feeling disjointed and rushed.",
  },
];

// Function to trim long descriptions
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const MostPopularServices: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Most Popular Services
          </h2>
          <Link
            to="/services"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View All
          </Link>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {servicesData.map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-lg overflow-hidden group relative"
            >
              {/* Image with color overlay and blur */}
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-black/50 bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300 ease-in-out">
                  {/* Title */}
                  <div className="text-center pt-14">
                    <h3 className="text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description shown on hover */}
              <div className="cursor-pointer absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-[#155b33] p-4 bg-opacity-80">
                <p className="text-white text-center">
                  {truncateText(service.description, 100)} {/* Truncate description */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopularServices;
