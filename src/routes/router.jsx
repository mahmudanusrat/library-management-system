import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AllBooksPage from "../pages/AllBooksPage";
import AddBookPage from "../pages/AddBookPage";
import PrivateRouter from "./PrivateRouter";
import BorrowedBooksPage from "../pages/BorrowedBooksPage";
import UpdateBookPage from "../pages/UpdateBookPage";
import CategoryBooks from "../pages/CategoryBooks";
import DetailsPage from "../pages/DetailsPage";
import BookCategories from "../components/Home/BookCategories/BookCategories";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Registration/RegisterPage";
import HomePage from "../pages/Home/HomePage";
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/allBooks",
        element: (
          <PrivateRouter>
            <AllBooksPage></AllBooksPage>
          </PrivateRouter>
        ),
      },
      {
        path: "/updateBook/:id",
        element: (
          <PrivateRouter>
            <UpdateBookPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/addBook",
        element: (
          <PrivateRouter>
            <AddBookPage></AddBookPage>
          </PrivateRouter>
        ),
      },

      {
        path: "/categories",
        element: <BookCategories />,
      },
      {
        path: "/category/:category",
        element: (
          <PrivateRouter>
            <CategoryBooks />
          </PrivateRouter>
        ),
      },
      {
        path: "/book/:bookId",
        element: <DetailsPage />,
      },
      {
        path: "/borrowedBooks",
        element: (
          <PrivateRouter>
            <BorrowedBooksPage></BorrowedBooksPage>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <Dashboard></Dashboard>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
]);

export default router;
