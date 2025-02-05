import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AllBooksPage from "../pages/AllBooksPage";
import AddBookPage from "../pages/AddBookPage";
import PrivateRouter from "./PrivateRouter";
import BorrowedBooksPage from "../pages/BorrowedBooksPage";
import NotFoundPage from "../pages/NotFoundPage";
import UpdateBookPage from "../pages/UpdateBookPage";
import BookCategories from "../components/BookCategories";
import CategoryBooks from "../pages/CategoryBooks";
import DetailsPage from "../pages/DetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/allBooks",
        element: (
          <PrivateRouter>
            <AllBooksPage></AllBooksPage>
          </PrivateRouter>
        ),
        loader:  ()=>fetch('https://library-management-system-server-side-phi.vercel.app/book')
      },
      {
        path: "/updateBook/:id",
        element: <PrivateRouter>
          <UpdateBookPage />
        </PrivateRouter>,
        
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
        path: '/categories',
        element: <BookCategories />,
      },
      {
        path: '/category/:category',
        element:<PrivateRouter> <CategoryBooks /></PrivateRouter>,
      },
      {
        path: '/book/:bookId', 
        element: <DetailsPage />,
      }, {
        path: "/borrowedBooks",
        element: (
          <PrivateRouter>
            <BorrowedBooksPage></BorrowedBooksPage>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;