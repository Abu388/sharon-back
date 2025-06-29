import GoalsSlideshow from "./GoalsSlideshow";

const Goals = () => {
  return (
    <div className="flex flex-col gap-4  md:flex-row">
      <div className="w-full ">
        <GoalsSlideshow />
      </div>
      <div className="w-full py-8 px-8">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold sm:text-4xl">
            How We Work to Improve Lives
          </h2>
        </div>
        <div className="space-y-4 sm:space-y-8">
          <div className="flex items-start">
            <div className="mr-4 text-lg font-bold sm:text-2xl">01.</div>
            <div>
              <h3 className="text-base font-semibold sm:text-xl">
                Ensure the continuity of the church
              </h3>
              <p className="text-sm text-gray-400 sm:text-base">
                By promoting the spread of the Gospel across generations and
                establishing intergenerational fellowship that brings children,
                youth, and adults together.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4 text-lg font-bold sm:text-2xl">02.</div>
            <div>
              <h3 className="text-base font-semibold sm:text-xl">
                Provide a life-changing curriculum
              </h3>
              <p className="text-sm text-gray-400 sm:text-base">
                Supported by resources across the country to help children of
                all ages become God-fearing, respectful, responsible, and
                disciplined citizens.
              </p>
            </div>
          </div>
            <div className="flex items-start">
            <div className="mr-4 text-lg font-bold sm:text-2xl">03.</div>
            <div>
              <h3 className="text-base font-semibold sm:text-xl">
              Enable children to experience God’s presence
              </h3>
              <p className="text-sm text-gray-400 sm:text-base">
              Through teaching.
              </p>
            </div>
            </div>
          <div className="flex items-start">
            <div className="mr-4 text-lg font-bold sm:text-2xl">04.</div>
            <div>
              <h3 className="text-base font-semibold sm:text-xl">
                Work to raise a generation of ministers
              </h3>
              <p className="text-sm text-gray-400 sm:text-base">
                Who have a divine calling, anointing, and burden to serve children and youth in their respective local churches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
