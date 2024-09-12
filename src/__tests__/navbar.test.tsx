import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

test("renders Navbar and handles logout", () => {
  // Mock sessionStorage
  sessionStorage.setItem("accessToken", "test-token");

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Check if "Log out" button is rendered
  const logoutButton = screen.getByText("Log out");
  expect(logoutButton).toBeInTheDocument();

  // Simulate logout button click
  fireEvent.click(logoutButton);

  // Check if sessionStorage was cleared
  expect(sessionStorage.getItem("accessToken")).toBeNull();
});
