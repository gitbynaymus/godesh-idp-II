import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StoryCard from "../../../components/Card/StoryCard";
import Loading from "../../../components/shared/Loading";
import Modal from "../../../components/Modal/Modal";
import { useRef, useState } from "react";

const ManageStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState(null);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${user.email}`);
      return res.data;
    },
  });

  const toastIdRef = useRef(null);
  const { mutate: deleteStory } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/stories/${id}`);
      return res.data;
    },
    onSuccess: () => {
      setIsModalOpen(false);
      toast.dismiss(toastIdRef.current);
      toast.success("Story deleted successfully!");
      queryClient.invalidateQueries(["stories", user.email]);
    },
    onError: () => {
      setIsModalOpen(false);
      toast.dismiss(toastIdRef.current);
      toast.error("Failed to delete story");
    },
  });
  const confirmSubmit = () => {
    toastIdRef.current = toast.loading("Deleting..");
    deleteStory(deleteCardId);
  };
  const openConfirmation = (id) => {
    setIsModalOpen(true);
    setDeleteCardId(id);
  };

  // if (isLoading) return <Loading />;
  // console.log(stories);
  return (
    <div className="">
      {isLoading && (
        <div className="flex h-screen items-center justify-center">
          <Loading fullscreen={false} />
        </div>
      )}
      {!isLoading && stories.length === 0 ? (
        <p className="mt-10 text-center text-lg text-gray-500">
          No story found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onDelete={openConfirmation}
            />
          ))}
        </div>
      )}

      {/* Reusable Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Story Delete"
        description="Are you sure you want to delete this story?"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={confirmSubmit}
      >
        <p className="mt-1 text-sm text-gray-500">
          Your story and images will be deleted permanently.
        </p>
      </Modal>
    </div>
  );
};

export default ManageStories;
