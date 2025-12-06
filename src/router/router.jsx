import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
// import ForgotPassword from "../pages/ForgetPassword";
// import Profile from "../pages/dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
// import AssignedTours from "../pages/dashboard/Admin/AssignedTours";
import DashboardRedirectByRole from "../Layouts/DashboardLayout/DashboardRedirectByRole";
// import AddPackages from "../pages/dashboard/Admin/AddPackages";
import MyBookings from "../pages/dashboard/Tourist/MyBookings";
import TouristProfile from "../pages/dashboard/Tourist/TouristProfile";
// import ManageStories from "../pages/dashboard/Tourist/ManageStories";
// import JoinAsGuide from "../pages/dashboard/Tourist/JoinAsGuide";
// import AddStories from "../pages/dashboard/Tourist/AddStories";
// import UpdateStory from "../pages/dashboard/Tourist/UpdateStory";
// import ManageUsers from "../pages/dashboard/Admin/ManageUsers";
// import ManageCandidates from "../pages/dashboard/Admin/ManageCandidates";
// import ManageAdminProfile from "../pages/dashboard/Admin/ManageAdminProfile";
// import ApplicationDetails from "../pages/dashboard/Admin/ApplicationDetails";
// import GuideProfile from "../pages/dashboard/Guide/GuideProfile";
import PackageDetails from "../pages/PackageDetails";
import AllPackages from "../pages/AllPackages";
import GuideDetails from "../pages/GuideDetails";
// import Payment from "../pages/dashboard/Payment/Payment";
// import { Elements } from "@stripe/react-stripe-js";
// // import { loadStripe } from "@stripe/stripe-js";
// import MyAssignedTours from "../pages/dashboard/Guide/MyAssignedTours";
import AllStories from "../pages/AllStories";
// import AboutUs from "../pages/AboutUs";
import AllGuides from "../pages/AllGuides";
import AccessDenied from "../pages/AccessDenied";
import RoleBasedRoute from "./RoleBasedRoute";
// import Offer from "../pages/Offer";
import NotFound from "../pages/NotFound";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/package/:id",
        element: <PackageDetails />,
      },
      {
        path: "/guide/:id",
        element: <GuideDetails />,
      },
      {
        path: "/all-packages",
        element: <AllPackages />,
      },
      {
        path: "/all-stories",
        element: <AllStories />,
      },
      {
        path: "/all-guides",
        element: <AllGuides />,
      },
      // {
      //   path: "/forgetPassword",
      //   element: <ForgotPassword />,
      // },
      //       {
      //   path: "/about-us",
      //   element: <AboutUs />,
      // },
      // {
      //   path: "/offer",
      //   element: <Offer />,
      // },
    ],
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
{
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
 children: [
      {
        index: true,
        element: <DashboardRedirectByRole />,
      },

  //     // Admin-only routes
  //     {
  //       path: "profile",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["admin"]}>
  //           <Profile />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "application-details",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["admin"]}>
  //           <ApplicationDetails />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "manage-admin-profile",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["admin"]}>
  //           <ManageAdminProfile />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "add-packages",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["admin"]}>
  //           <AddPackages />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "manage-users",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["admin"]}>
  //           <ManageUsers />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "manage-candidates",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["admin"]}>
  //           <ManageCandidates />
  //         </RoleBasedRoute>
  //       ),
  //     },

  //     //Tourist-only routes
      {
        path: "my-bookings",
        element: (
          <RoleBasedRoute allowedRoles={["tourist"]}>
            <MyBookings />
          </RoleBasedRoute>
        ),
      },
      {
        path: "manage-tourist-profile",
        element: (
          <RoleBasedRoute allowedRoles={["tourist"]}>
            <TouristProfile />
          </RoleBasedRoute>
        ),
      },
  //     {
  //       path: "manage-stories",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["tourist","guide"]}>
  //           <ManageStories />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "join-as-guide",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["tourist"]}>
  //           <JoinAsGuide />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "add-story",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["tourist", "guide"]}>
  //           <AddStories />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "update-story/:id",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["tourist", "guide"]}>
  //           <UpdateStory />
  //         </RoleBasedRoute>
  //       ),
  //     },

  //     // Shared route (Tourist → Pay for booking)
  //     {
  //       path: "payment/:bookingId",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["tourist"]}>
  //           <Elements stripe={stripePromise}>
  //             <Payment />
  //           </Elements>
  //         </RoleBasedRoute>
  //       ),
  //     },

  //     //guide route
  //     {
  //       path: "my-assign-tour",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["guide"]}>
  //           <MyAssignedTours />
  //         </RoleBasedRoute>
  //       ),
  //     },
  //     {
  //       path: "guide-profile",
  //       element: (
  //         <RoleBasedRoute allowedRoles={["guide"]}>
  //           <GuideProfile />
  //         </RoleBasedRoute>
  //       ),
  //     },
],
 },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
