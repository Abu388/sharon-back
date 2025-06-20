import { Ministry } from "@/models/Ministry";
import { motion } from "framer-motion";
import { Book, Image } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Service from "@/models/Service";

const ServiceMinistryCard = ({ data }: { data: Ministry | Service }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mb-6 rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
    >
      <Link to="/images">
        <h3 className="text-xl font-semibold text-blue-700 hover:underline">
          {data.title}
        </h3>
      </Link>
      <p className="mt-2 text-gray-700">{data.description}</p>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button
          className="cursor-pointer bg-blue-300 text-white hover:bg-blue-500"
          onClick={() => navigate("/images")}
          size={"icon"}
          >
          <Image />
        </Button>
        <Button
          className="cursor-pointer bg-blue-300 text-white hover:bg-blue-500"
          onClick={() => navigate("/books")}
          size={"icon"}
        >
          <Book />
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceMinistryCard;
