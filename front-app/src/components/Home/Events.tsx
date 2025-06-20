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
    <div className="bg-white px-24 py-16 md:px-8">
      <div className="mb-12">
        <h2 className="mb-4 text-4xl font-semibold">
          Newest Info About Our Community
        </h2>
        <p className="text-lg text-gray-600">
          Transforming Lives Through Compassionate Action: Our Services for a
          Better World. Our mission is to enhance the lives of individuals and
          communities in need.
        </p>
        <a href="#" className="inline-flex items-center text-blue-500">
          View More →
        </a>
      </div>
      <div className="flex items-center gap-10 flex-wrap">
        {events.map((event, index) => (
          <div
            key={index}
            className="space-y-2 max-w-[350px] rounded-md p-4 transition-shadow duration-200"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full rounded-md object-cover"
            />
            <p className="text-gray-500">{event.date}</p>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
