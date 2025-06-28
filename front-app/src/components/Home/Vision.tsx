const Vision = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center gap-4 bg-[linear-gradient(to_right,#fff_50%,rgba(255,255,255,0)_100%),url(/assets/images/Hero/photo_4_2025-05-17_04-29-23.jpg)] bg-right bg-no-repeat px-4 py-8 text-black sm:gap-10 sm:px-8 md:flex-row">
      <div className="w-full md:w-1/2">
        <div className="mb-6">
          <div className="mb-2 flex items-center">
            <div className="mr-2 h-0.5 w-12 bg-black"></div>
            <span className="text-xs uppercase sm:text-sm">Vision</span>
          </div>
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Vision of the Ministry
          </h2>
          <p className="text-sm leading-relaxed sm:text-lg">
            SCS aims to help children enjoy their childhood and experience the
            glory of God by nurturing their spiritual life and helping them to
            become heroic disciples of Christ. The overarching vision is to see
            children and young adults in Ethiopia use their freedom to come to
            the Lord and grow holistically (spiritually, physically,
            emotionally, and socially).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
