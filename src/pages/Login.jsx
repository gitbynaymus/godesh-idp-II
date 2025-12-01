import { Link, Navigate, useLocation, useNavigate } from "react-router";
import Button from "../components/Button/Button";
import GoogleLogin from "../components/shared/GoogleLogin";
import { useAuth } from "../hooks/useAuth";
import { saveUserInfo } from "../utils/utils";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const axios = useAxios();
  const from = location?.state?.from?.pathname || "/";
  if (user) return <Navigate to={from} replace={true} />;
  // if (loading) return <LoadingSpinner />;
  // form submit handler

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    try {
      //User Login
      await signIn(email, password);
      const userInfo = {
        email,
      };
      await saveUserInfo(userInfo);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      if (err?.message === "Firebase: Error (auth/invalid-credential).") {
        toast.error("Invalid Email or Password");
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-80px)] w-11/12 max-w-[1440px] items-center justify-center">
      <div className="w-full max-w-md space-y-3 rounded-xl bg-green-50 p-8 shadow dark:bg-gray-50 dark:text-gray-800">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <form
          onSubmit={handleSignIn}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full rounded-md border border-accent px-4 py-3 focus:outline-accent"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-md border border-accent px-4 py-3 focus:outline-accent"
            />
            <div className="mt-1 flex justify-end text-xs font-semibold text-primary dark:text-gray-600">
              <Link to="/forgetPassword">Forgot Password?</Link>
            </div>
          </div>
          <Button className="w-full py-3" type="submit">
            Sign in
          </Button>
        </form>
        <div className="flex items-center space-x-1 pt-4">
          <div className="h-px flex-1 sm:w-16 dark:bg-gray-300"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="h-px flex-1 sm:w-16 dark:bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <GoogleLogin />
        </div>
        <p className="text-center text-xs sm:px-6 dark:text-gray-600">
          Don't have an account?
          <Link to="/register" className="underline dark:text-gray-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
