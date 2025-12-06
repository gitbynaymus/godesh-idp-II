import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loading from "../../components/shared/Loading";
import Header from "../../components/shared/Dashboard/Header";

const Profile = () => {
  const { user } = useAuth();
  const [role, loading] = useRole();
  // console.log(role);

  if (!user || loading) return <Loading />;

  return (
    <div className="h-full">
      <Header title="MyProfile" />
      <div className="mx-auto rounded-xl bg-white p-6 shadow-md dark:bg-gray-100">
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={user.photoURL || "/default-profile.png"}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-accent object-cover"
          />
          <span className="rounded-full bg-accent px-6 py-2 text-xs font-semibold text-white">
            {(role && role?.toUpperCase()) || ""}
          </span>
          <div className="w-full max-w-md space-y-3 md:ml-6">
            <div>
              <p className="rounded px-4 py-2 text-gray-800">
                {user.displayName || "N/A"}
              </p>
            </div>
            <div>
              <p className="rounded px-4 py-2 text-gray-800">{user.email}</p>
            </div>
            <div className="pt-4 text-right">
              <Link
                to="/dashboard/edit-profile"
                className="rounded bg-accent px-5 py-2 text-white transition hover:bg-accent/90"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
