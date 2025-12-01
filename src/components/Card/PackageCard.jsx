// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import Button from "../Button/Button";

const PackageCard = ({ pack }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-lg bg-white shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={pack.galleryImages?.[0]}
        alt={pack.tripTitle}
        className="h-40 w-full object-cover"
      />
      <div className="space-y-2 p-4">
        <p className="text-sm text-gray-500">{pack.tourType}</p>
        <h3 className="text-lg font-bold">{pack.tripTitle}</h3>
        <p className="font-semibold text-blue-600">${pack.price}</p>
        <Link to={`/package/${pack._id}`}>
          <Button className="py-1 px-2 text-sm">View Package</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PackageCard;
