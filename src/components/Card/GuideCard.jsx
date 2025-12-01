import { useNavigate } from "react-router";

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-md transition hover:shadow-xl">
      <div className="flex flex-col items-center text-center">
        <img
          src={guide.image}
          alt={guide.name}
          className="mb-4 h-20 w-20 rounded-full object-cover ring-2 ring-accent ring-offset-2"
        />
        <h3 className="text-lg font-semibold">{guide.name}</h3>
        <p className="text-sm text-gray-500">{guide.email}</p>

        <button
          onClick={() => navigate(`/guide/${guide._id}`)}
          className="btn btn-sm btn-primary mt-4 cursor-pointer duration-300 hover:text-accent"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default GuideCard;
