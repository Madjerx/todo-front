import { render, screen } from "@testing-library/react";
import TodoDetails from "./TodoDetails";

const mockedTask = {
  title: "Task 1",
  priority: 1,
  done: false,
  description: "Description 1",
  createdAt: "2023-05-31T10:00:00.000Z",
  updatedAt: "2023-05-31T10:30:00.000Z",
};

test("renders TodoDetails component with good values", () => {
  render(<TodoDetails task={mockedTask} />);

  // Check if the task title is rendered correctly
  const titleElement = screen.getByText("Task 1");
  expect(titleElement).toBeInTheDocument();

  // Check if the task description is rendered correctly
  const descElement = screen.getByText("Description : Description 1");
  expect(descElement).toBeInTheDocument();

  // Check if the task createdAt is rendered correctly
  const createdAtElement = screen.getByText("Created : 31/05/2023 at 12:00");
  expect(createdAtElement).toBeInTheDocument();

  // Check if the task updatedAt is rendered correctly
  const updatedAtElement = screen.getByText(
    "Last update : 31/05/2023 at 12:30"
  );
  expect(updatedAtElement).toBeInTheDocument();

  // Check if close button is rendered correctly
  const closeButton = screen.getByRole("button", { name: "Close X" });
  expect(closeButton).toBeInTheDocument();
});

test("Renders with a span with className equal to the priority attribute", () => {
  const { container } = render(<TodoDetails task={mockedTask} />);
  expect(container.getElementsByClassName("blue green-false").length).toBe(1);
});
