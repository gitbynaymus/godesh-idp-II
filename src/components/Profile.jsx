import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUser } from "../hooks/useUser";
import Loading from "./shared/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import useRole from "../hooks/useRole";
import { FaRegEdit } from "react-icons/fa";
import Badge from "./shared/Badge";

const Profile = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [role, loading] = useRole();
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useUser();
  const { updateUserProfile, loading: authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: userData?.name,
      image: userData?.image,
    },
  });

  const toastIdRef = useRef(null);

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(
        `/users?email=${userData?.email}`,
        data,
      );
      return res;
    },
    onSuccess: (res) => {
      console.log("Profile Updated:", res);
      toast.dismiss(toastIdRef.current);
      toast.success("Profile Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user", userData?.email] });
      reset();
    },
    onError: (err) => {
      console.error(err);
      toast.dismiss(toastIdRef.current);
      toast.error("Failed to Update profile");
    },
  });

  const onSubmit = (data) => {
    toastIdRef.current = toast.loading("Updating Profile");
    setIsOpenModal(false);
    mutate({
      name: data?.name,
      image: data?.image,
    });
    updateUserProfile(data?.name, data?.image);
  };

  if (isLoading || loading || authLoading) return <Loading />;
  console.log(userData);
  return (
    <div className="mx-auto max-w-md">
      {role && role !== "admin" && (
        <h2 className="mb-4 pb-10 text-center text-2xl font-bold">
          Welcome, {userData?.name}!
        </h2>
      )}
      <div className="flex flex-col items-center gap-15 lg:flex-row">
        <img
          src={userData?.image}
          alt="User"
          className="h-24 w-24 rounded-full border object-cover ring-2 ring-accent ring-offset-2"
        />
        <div>
          <Badge>{userData?.role}</Badge>
          <p>
            <strong>Name:</strong> {userData?.name}
          </p>
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-between gap-3">
        <Button
          icon={<FaRegEdit />}
          onClick={() => {
            setIsOpenModal(true);
            reset({ name: userData?.name, image: userData?.image });
          }}
          className="max-w-30 flex-1 py-2"
        >
          Edit Profile
        </Button>
        {role && role === "tourist" && (
          <Button
            onClick={() => navigate("/dashboard/join-as-guide")}
            variant="outline"
            className=""
          >
            Apply For Tour Guide
          </Button>
        )}
      </div>

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Edit Admin Info"
        description="You can only update name and image"
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={handleSubmit(onSubmit)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Name</label>
            <input
              type="text"
              // defaultValue={userData?.name}
              {...register("name", { required: true })}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            {errors?.name && (
              <p className="mt-1 text-sm text-red-600">Name is required</p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Photo URL</label>
            <input
              type="text"
              defaultValue={userData?.image}
              {...register("image", { required: true })}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">Photo URL is required</p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input
              type="email"
              value={userData?.email}
              disabled
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Role</label>
            <input
              type="text"
              value={userData?.role}
              disabled
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
