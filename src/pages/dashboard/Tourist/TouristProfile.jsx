import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUser } from "../../../hooks/useUser";
import Loading from "../../../components/shared/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Button from "../../../components/Button/Button";

const TouristProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useUser();

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
      const res = await axiosSecure.patch(`/users?email=${user?.email}`, data);
      return res;
    },
    onSuccess: (res) => {
      console.log("Profile Updated:", res);
      toast.dismiss(toastIdRef.current);
      toast.success("Profile Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user", user?.email] });
      reset();
    },
    onError: (err) => {
      console.error(err);
      toast.dismiss(toastIdRef.current);
      toast.error("Failed to Update profile");
    },
  });

  if (isLoading || loading) return <Loading />;
  const onSubmit = (data) => {
    toastIdRef.current = toast.loading("Updating Profile");
    setIsOpen(false);
    // Call update API here
    mutate(data);
  };
  // console.log(userData);
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold">
        Welcome, {userData?.name}!
      </h2>
      <div className="flex flex-col items-center gap-2">
        <img
          src={userData?.image || "/default-avatar.png"}
          alt="User"
          className="h-24 w-24 rounded-full border object-cover"
        />
        <p>
          <strong>Name:</strong> {userData?.name}
        </p>
        <p>
          <strong>Email:</strong> {userData?.email}
        </p>
        <p>
          <strong>Role:</strong> {userData?.role}
        </p>
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <Button onClick={() => setIsOpen(true)} className="flex-1">
          Edit Profile
        </Button>
        <Button
          onClick={() => navigate("/dashboard/join-as-guide")}
          variant="outline"
          className=""
        >
          Apply For Tour Guide
        </Button>
      </div>

      {/* Headless UI Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-opacity-30 fixed inset-0 bg-primary/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="mb-4 text-xl font-semibold">
                    Edit Profile
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="mb-1 block font-medium">Name</label>
                      <input
                        type="text"
                        defaultValue={userData?.name}
                        {...register("name", { required: true })}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                      />
                      {errors?.name && (
                        <p className="mt-1 text-sm text-red-600">
                          Name is required
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block font-medium">
                        Photo URL
                      </label>
                      <input
                        type="text"
                        defaultValue={userData?.image}
                        {...register("photo", { required: true })}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                      />
                      {errors.photo && (
                        <p className="mt-1 text-sm text-red-600">
                          Photo URL is required
                        </p>
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

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className=""
                        variant="danger"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TouristProfile;
