import { createBrowserRouter } from "react-router"
import Layout from "@/components/Layout"
import HomePage from "@/pages/HomePage"
import GuidePublicPage from "@/pages/GuidePublicPage"
import EventPage from "@/pages/EventPage"
import BookingsPage from "@/pages/BookingsPage"
import ProfilePage from "@/pages/ProfilePage"
import BecomeGuidePage from "@/pages/BecomeGuidePage"
import GuideEventsPage from "@/pages/GuideEventsPage"
import GuideEventNewPage from "@/pages/GuideEventNewPage"
import GuideEventManagePage from "@/pages/GuideEventManagePage"
import GeographyRequestPage from "@/pages/GeographyRequestPage"
import LoginPage from "@/pages/LoginPage"
import NotFoundPage from "@/pages/NotFoundPage"
import RequireGuide from "@/components/RequireGuide"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "u/:username", element: <GuidePublicPage /> },
      { path: "events/:id", element: <EventPage /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/become-guide", element: <BecomeGuidePage /> },
      {
        element: <RequireGuide />,
        children: [
          { path: "guide/events", element: <GuideEventsPage /> },
          { path: "guide/events/new", element: <GuideEventNewPage /> },
          { path: "guide/events/:id", element: <GuideEventManagePage /> },
        ],
      },
      { path: "geography/request", element: <GeographyRequestPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])