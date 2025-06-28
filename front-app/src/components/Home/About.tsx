const About = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center gap-10 bg-[linear-gradient(to_right,#Fff_50%,rgba(255,255,255,0)_100%),url(/assets/images/Hero/photo_8_2025-05-17_04-29-23.jpg)] bg-right bg-no-repeat px-4 py-8 text-black sm:px-8 md:flex-row">
      <div className="w-full md:w-1/2">
        <div className="mb-6">
          <h2 className="text-primary mb-4 text-2xl font-bold sm:text-4xl">
            About Us
          </h2>
          <span className="mb-2 inline-block text-2xl text-gray-400 sm:text-4xl">
            “
          </span>
          <blockquote className="border-primary border-l-4 pl-4 text-lg text-gray-700 italic sm:text-xl">
            Sharon Children’s Services Ethiopia (SCS Ethiopia) is a
            faith-driven, non-profit organization serving the spiritual,
            intellectual, physical, and economic needs of children and foster
            youth since 1998 — guided by God to expand its mission across
            Ethiopia, Africa, and beyond.
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default About;
