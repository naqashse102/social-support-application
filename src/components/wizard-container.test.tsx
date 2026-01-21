import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi} from "vitest";
import * as storage from "../utils/local-storage";
import WizardContainer from "./wizard-container";
import { renderWithProviders } from "../utils/test.util";

vi.mock("../utils/local-storage", async (importActual) => {
  const actual = await importActual<typeof import("../utils/local-storage")>();
  return {
    ...actual,
    // Ensure 'get' is explicitly a vitest mock function here
    get: vi.fn(),
  };
});

test("should hydrate form with data from localStorage on mount", async () => {
  const mockData = { name: "John Doe", email: "john@example.com" };

  // Use vi.mocked for proper type and method access
  const mockedGet = vi.mocked(storage.get);

  mockedGet.mockImplementation((key: string) => {
    if (key === storage.formStorageKey) return mockData;
    if (key === storage.formActiveStepKey) return 1;
    return null;
  });

  renderWithProviders(<WizardContainer />);

  // Wait for the mock data to populate the input
  const nameInput = (await screen.findByLabelText(
    /Full Name/i,
  )) as HTMLInputElement;
  expect(nameInput.value).toBe("John Doe");
});

test("input should be linked to error message via aria-describedby when invalid", async () => {
  renderWithProviders(<WizardContainer />);
  
  const nextButton = screen.getByText(/Next Step/i);
  
  fireEvent.click(nextButton);

  const idInput = await screen.findByLabelText(/National ID/i);

  const errorMsg = await screen.findByText(/National ID number is required/i);

  expect(idInput).toHaveAttribute("aria-invalid", "true");
  expect(errorMsg).toHaveAttribute("role", "alert");
  
  expect(idInput).toHaveAttribute("aria-describedby", errorMsg.id);
});