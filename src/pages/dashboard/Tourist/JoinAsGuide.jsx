import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../../../components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useUser } from "../../../hooks/useUser";
import Loading from "../../../components/shared/Loading";

const JoinAsGuide = () => {
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: user, isLoading } = useUser();
  const toastIdRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openConfirmDialog = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const roleRequestMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/users/request-role?email=${user?.email}`, {
        requestedRole: "guide",
      }),
    onSuccess: () => {
      setFormData({
        title: "",
        reason: "",
        cvLink: "",
      });
    },
  });

  const applicationMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post("/guide-applications", {
        ...formData,
        email: user?.email,
        name: user?.name,
      }),
    onSuccess: () => {
      toast.dismiss(toastIdRef.current);
      toast.success("Application submitted successfully");
      setIsConfirmOpen(false);
      roleRequestMutation.mutate();
    },
    onError: (err) => {
      toast.dismiss(toastIdRef.current);
      if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsConfirmOpen(false);
    },
  });

  const confirmSubmit = () => {
    toastIdRef.current = toast.loading("Submitting application...");
    applicationMutation.mutate();
  };
  if (isLoading) return <Loading />;
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Join as Tour Guide
      </h2>
      <form onSubmit={openConfirmDialog} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">Application Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows="4"
            className="w-full rounded border border-gray-300 px-3 py-2"
          ></textarea>
        </div>

        <div>
          <label className="mb-1 block font-medium">CV Link</label>
          <input
            type="url"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>

      {/* Confirmation Dialog */}
      <Transition appear show={isConfirmOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsConfirmOpen(false)}
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

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold">
                  Confirm Submission
                </Dialog.Title>
                <p className="mt-2 text-gray-600">
                  Are you sure you want to submit your application to become a
                  tour guide?
                </p>
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    onClick={() => setIsConfirmOpen(false)}
                    className=""
                    variant="danger"
                  >
                    Cancel
                  </Button>
                  <Button onClick={confirmSubmit} className="">
                    Confirm
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default JoinAsGuide;
