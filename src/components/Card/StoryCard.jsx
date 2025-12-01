import { Link } from "react-router";
import Button from "../Button/Button";
const StoryCard = ({ story, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={story.images[0]}
        alt="Story Cover"
        className="h-48 w-full rounded object-cover"
      />
      <div className="p-4">
        <h3 className="mt-2 text-lg font-bold">{story.title}</h3>
        <p className="text-sm text-gray-600">{story.content.slice(0, 100)}...</p>
        <div className="mt-4 flex items-center justify-between">
          <Link to={`/dashboard/update-story/${story._id}`} className="">
            <Button>Edit</Button>
          </Link>
          <Button
            onClick={() => onDelete(story._id)}
            className=""
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
