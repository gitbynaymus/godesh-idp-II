import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getImageUrl } from "../../../utils/utils";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import { X } from "lucide-react";
import Profile from "../../../components/Profile";

const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: story, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const [form, setForm] = useState({ title: "", content: "" });
  const [images, setImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (story) {
      setForm({ title: story.title, content: story.content });
      setImages(story.images);
    }
  }, [story]);

  const updateStory = useMutation({
    mutationFn: async (payload) => axiosSecure.patch(`/stories/${id}`, payload),
    onSuccess: () => {
      toast.success("Story updated!");
      queryClient.invalidateQueries(["stories"]);
      navigate("/dashboard/manage-stories");
    },
  });

  const addImage = useMutation({
    mutationFn: async (imageUrl) =>
      axiosSecure.patch(`/stories/add-image/${id}`, { imageUrl }),
    onSuccess: () => {
      toast.success("Image added");
      queryClient.invalidateQueries(["story", id]);
    },
  });

  const removeImage = useMutation({
    mutationFn: async (imageUrl) =>
      axiosSecure.patch(`/stories/remove-image/${id}`, { imageUrl }),
    onSuccess: () => {
      toast.success("Image removed");
      queryClient.invalidateQueries(["story", id]);
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateStory.mutate(form);
  };

  const handleAddImages = async () => {
    for (let file of newFiles) {
      const url = await getImageUrl(file);
      addImage.mutate(url);
    }
    setNewFiles([]);
  };

  const confirmRemoveImage = (url) => {
    setIsOpenModal(true);
    setImgToRemove(url);
  };

  const doRemoveImage = () => {
    setIsOpenModal(false);
    removeImage.mutate(imgToRemove);
    setImgToRemove(null);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Edit Story</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <label className="block">
          Title
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded border px-3 py-2"
            required
          />
        </label>
        <label className="block">
          Content
          <textarea
            name="content"
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full rounded border px-3 py-2"
            required
          />
        </label>

        <div>
          <p className="font-medium">Current Images:</p>
          <div className="mt-2 flex gap-8 p-4">
            {images.map((url) => (
              <div key={url} className="relative">
                <img src={url} className="h-24 w-24 rounded object-cover" />
                <button
                  type="button"
                  onClick={() => confirmRemoveImage(url)}
                  className="absolute top-0 right-0 flex h-5 w-5 translate-x-[50%] -translate-y-[50%] items-center justify-center rounded-full bg-red-500 text-white"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="block">
          Add Images
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            multiple
            onChange={(e) => setNewFiles(Array.from(e.target.files))}
            className="mt-2"
          />
        </label>
        <div className="flex justify-between">
          {newFiles.length > 0 && (
            <Button
              type="button"
              onClick={handleAddImages}
              className=""
              variant="secondary"
            >
              Upload Images
            </Button>
          )}
          <Button type="submit" className="">
            Save Changes
          </Button>
        </div>
      </form>
      

      {/* Confirm remove image modal */}
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Remove Image?"
        description="Are you sure you want to delete this image?"
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={doRemoveImage}
      />
    </div>
  );
};

export default UpdateStory;
