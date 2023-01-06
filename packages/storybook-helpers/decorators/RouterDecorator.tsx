import { DecoratorFn } from "@storybook/react";
import {createMemoryRouter, RouterProvider } from "react-router-dom";

const createRouter = (story: JSX.Element) => createMemoryRouter([
  {
   /**
    * Use any route and just pass it the current story
    */
    path: "/*",
    element: story
  }
])


const RouterDecorator: DecoratorFn = (Story) => {
  const router = createRouter(<Story />);
  return <RouterProvider router={router} />;
};

export default RouterDecorator;