const Faith = () => {
  return (
    <div className="bg-[#0065ca] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        {/* Faith Header */}
        <div className="mb-4 flex items-center justify-center">
          <div className="mr-2 h-0.5 w-12 bg-white"></div>
          <span className="text-xs uppercase sm:text-sm">Faith</span>
        </div>

        {/* Title */}
        <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">
          Faith of the Ministry
        </h2>

        {/* Content */}
        <p className="mx-auto text-sm text-white/80 sm:text-lg md:w-3/4">
          SCS believes that socio-economic problems are fundamentally rooted in
          wrong cultural ideas and beliefs that are contrary to the truth,
          eventually leading to unhealthy lifestyles and sin. Change begins with
          altering such wrong societal mindsets. Children are a fundamental part
          of society, and if not properly cared for, they can become victims and
          a major source of crisis. SCS believes God has a special purpose for
          young children in Ethiopia, similar to how Jesus used a child’s food
          to bless many (John 6:6).
        </p>
      </div>
    </div>
  );
};

export default Faith;
