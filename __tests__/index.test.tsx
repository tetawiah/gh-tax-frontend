import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Index from "../app/index";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
}));

global.alert = jest.fn();

describe("Index Component", () => {
  it("should show alert for net salary below minimum wage", async () => {
    const { getByTestId, getByText } = render(<Index />);

    fireEvent.changeText(getByTestId("netSalary"), "15");
    fireEvent.press(getByText("Calculate"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        `Net salary must be an amount greater than or equal to GHS 18.15`
      );
    });
  });

  it("should show alert for empty allowance name with valid amount", async () => {
    const { getByTestId, getByText } = render(<Index />);

    fireEvent.changeText(getByTestId("netSalary"), "2000");
    fireEvent.changeText(getByTestId("amount 1"), "500");
    fireEvent.press(getByText("Calculate"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        `Please fill corresponding allowance name field for the amount entered`
      );
    });
  });

  it("should show alert for empty allowance amount with valid name", async () => {
    const { getByTestId, getByText } = render(<Index />);

    fireEvent.changeText(getByTestId("netSalary"), "2000");
    fireEvent.changeText(getByTestId("allowance 2"), "Housing");
    fireEvent.press(getByText("Calculate"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        `Please fill corresponding amount field for the allowance name entered`
      );
    });
  });

  it("should navigate to salary screen for valid inputs", async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <Index navigation={navigation} />
    );

    fireEvent.changeText(getByTestId("netSalary"), "2000");
    fireEvent.changeText(getByTestId("allowance 3"), "Housing");
    fireEvent.changeText(getByTestId("amount 3"), "500");
    fireEvent.press(getByText("Calculate"));

    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith("salary", {
        grossSalary: expect.any(String),
        payeTax: expect.any(String),
        basicSalary: expect.any(String),
        employeePensions: expect.any(String),
        employerPensions: expect.any(String),
      });
    });
  });
});
