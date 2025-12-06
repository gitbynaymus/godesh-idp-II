import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getImageUrl } from "../../../utils/utils";
import Modal from "../../../components/Modal/Modal";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../components/Button/Button";

const AddStory = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {user} = useAuth()

  const toastIdRef = useRef(null);

  const { mutate } = useMutation({
    mutationFn: async (story) => {
      const res = await axiosSecure.post("/stories", story);
      return res;
    },
    onSuccess: () => {
      toast.dismiss(toastIdRef.current);
      toast.success("Story added successfully!");
    },
    onError: (err) => {
      console.error(err);
      toast.dismiss(toastIdRef.current);
      toast.error("Failed to add story");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    const filtered = files.filter((file) => validTypes.includes(file.type));

    setSelectedFiles((prevFiles) => {
      const existingNames = new Set(prevFiles.map((f) => f.name));
      const newFiles = filtered.filter((f) => !existingNames.has(f.name));
      return [...prevFiles, ...newFiles];
    });

    // Optional: Reset file input to allow selecting same file again
    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const openConfirmation = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || selectedFiles.length === 0) {
      toast.error("Please fill in all fields and upload at least one image.");
      return;
    }

    setIsModalOpen(true);
  };
  const confirmSubmit = async () => {
    setUploading(true);
    setIsModalOpen(false);
    toastIdRef.current = toast.loading("Adding Story...");

    try {
      if (!selectedFiles || selectedFiles.length === 0) {
        toast.dismiss(toastIdRef.current);
        toast.error("Please select at least one image.");
        setUploading(false);
        return;
      }
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];

      for (const file of selectedFiles) {
        if (!validTypes.includes(file.type)) {
          toast.dismiss(toastIdRef.current);
          toast.error("Only JPG, JPEG, and PNG images are allowed.");
          setUploading(false);
          return;
        }
      }
      const uploadPromises = selectedFiles.map((file) => getImageUrl(file));
      const imageUrls = await Promise.all(uploadPromises);

      const storyData = {
        ...formData,
        images: imageUrls,
        createdBy:user?.email,
      };
      // console.log(storyData);

      mutate(storyData);
      toast.dismiss();
      // toast.success("Story added successfully!");
      navigate("/dashboard/manage-stories");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to add story.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="min-h-[90vh] rounded-lg">
      <div className="mx-auto max-w-3xl rounded p-6">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Add a Travel Story
        </h2>
        <form onSubmit={openConfirmation} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Story Title</label>
            <input
              type="text"
              name="title"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Your Story</label>
            <textarea
              name="content"
              rows="5"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Upload Images</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={handleFileChange}
              className="w-full rounded border p-2"
            />
            <p className="mt-1 text-sm text-gray-500">
              You can select multiple JPG, PNG images.
            </p>
            {/* File preview list */}
            {selectedFiles.length > 0 && (
              <ul className="mt-2 space-y-1">
                {selectedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded bg-gray-100 px-3 py-1"
                  >
                    <span className="truncate text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            type="submit"
            disabled={uploading}
            className=""
          >
            {uploading ? "Submitting..." : "Submit Story"}
          </Button>
        </form>
        {/* Reusable Confirmation Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Story Submission"
          description="Are you sure you want to publish this story?"
          confirmText="Yes, Submit"
          cancelText="Cancel"
          onConfirm={confirmSubmit}
        >
          <p className="mt-1 text-sm text-gray-500">
            Your story and images will be saved permanently. You can manage it
            later from your dashboard.
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default AddStory;
