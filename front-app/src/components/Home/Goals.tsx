import GoalsSlideshow from "./GoalsSlideshow";

const Goals = () => {
  return (
    <div className="flex w-full flex-col gap-10 pr-24 md:flex-row md:pr-8">
      <div className="md:w-full">
        <GoalsSlideshow />
      </div>
      <div className="w-full py-16">
        <div className="mb-12">
          <h2 className="mb-4 text-4xl font-semibold">
            How We Work to Improve Lives
          </h2>
        </div>
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="mr-4 text-2xl font-bold">01.</div>
            <div>
              <h3 className="text-xl font-semibold">
                Ensure the continuity of the church
              </h3>
              <p className="text-gray-400">
                By promoting the spread of the Gospel across generations and
                establishing intergenerational fellowship that brings children,
                youth, and adults together.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4 text-2xl font-bold">02.</div>
            <div>
              <h3 className="text-xl font-semibold">
                Provide a life-changing curriculum
              </h3>
              <p className="text-gray-400">
                Supported by resources across the country to help children of
                all ages become God-fearing, respectful, responsible, and
                disciplined citizens.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4 text-2xl font-bold">03.</div>
            <div>
              <h3 className="text-xl font-semibold">
                Enable children to experience God’s presence
              </h3>
              <p className="text-gray-400">Through teaching.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4 text-2xl font-bold">04.</div>
            <div>
              <h3 className="text-xl font-semibold">
                Work to raise a generation of ministers
              </h3>
              <p className="text-gray-400">
                Who have a divine calling, anointing, and burden to serve
                children and youth in their respective local churches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
