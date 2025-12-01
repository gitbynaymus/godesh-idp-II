import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import ImageGallery from "../ImageGallery";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useEffect, useRef, useState } from "react";
import { FaShareFromSquare } from "react-icons/fa6";

const StoryList = ({ story }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const images = story?.images || [];
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const currentUrl = `${window.location.origin}/story/${story?._id}`;

  const togglePopup = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-3 overflow-hidden rounded-lg bg-white shadow">
      <ImageGallery images={images} />
      <div className="p-4">
        <h3 className="font-semibold">{story?.title}</h3>
        <p className="text-sm text-gray-700">{story?.content}</p>
        {/* Share button */}
        <div className="relative inline-block" ref={popupRef}>
          <button
            onClick={togglePopup}
            className="group flex items-center gap-1 text-green-500 hover:text-green-700"
          >
            <span className="text-sm font-medium">Share</span>
            <span className="duration-300 group-hover:translate-x-1">
              <FaShareFromSquare size={16} />
            </span>
          </button>
          {/* Share popup */}
          {showPopup && (
            <div className="absolute left-0 z-10 mt-2 flex gap-3 rounded-md border border-green-200 bg-white p-2 shadow-md">
              <FacebookShareButton url={currentUrl} quote={story.title}>
                <FacebookIcon size={24} round />
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl} title={story.title}>
                <TwitterIcon size={24} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={currentUrl}
                title={story.title}
                separator=":: "
              >
                <WhatsappIcon size={24} round />
              </WhatsappShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryList;
