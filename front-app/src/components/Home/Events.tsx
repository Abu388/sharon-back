const Events = () => {
  const events = [
    {
      image: "/assets/images/Hero/photo_1_2025-05-17_04-29-23.jpg",
      date: "June 1, 2024",
      title: "Help Them Happy",
      description:
        "You have interesting ideas and opportunities, feel free to contact.",
    },
    {
      image: "/assets/images/Hero/photo_2_2025-05-17_04-29-23.jpg",
      date: "June 1, 2024",
      title: "Help Them Happy",
      description:
        "You have interesting ideas and opportunities, feel free to contact.",
    },
    {
      image: "/assets/images/Hero/photo_1_2025-05-17_04-29-23.jpg",
      date: "June 1, 2024",
      title: "Help Them Happy",
      description:
        "You have interesting ideas and opportunities, feel free to contact.",
    },
    {
      image: "/assets/images/Hero/photo_1_2025-05-17_04-29-23.jpg",
      date: "June 1, 2024",
      title: "Help Them Happy",
      description:
        "You have interesting ideas and opportunities, feel free to contact.",
    },
  ];

  return (
    <div className="bg-white px-4 py-8 sm:px-8">
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold sm:text-4xl">
          Newest Info About Our Community
        </h2>
        <p className="text-base text-gray-600 sm:text-lg">
          Transforming Lives Through Compassionate Action: Our Services for a
          Better World. Our mission is to enhance the lives of individuals and
          communities in need.
        </p>
        <a href="#" className="inline-flex items-center text-blue-500">
          View More →
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:gap-10">
        {events.map((event, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <img src={event.image} alt={event.title} className="rounded-md" />
            <h3 className="mt-4 text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-500">{event.date}</p>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
