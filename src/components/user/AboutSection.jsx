// AboutSection.js
const AboutSection = ({ title, content, image, imageFirst }) => {
  const sectionClass = imageFirst ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div
      className={`flex flex-col ${sectionClass} items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 my-16`}
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          className="rounded-lg shadow-lg md:max-w-md w-full object-cover"
          src={image}
          alt={title}
        />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default AboutSection;
