import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DirectionHandler } from "./direction-handler";
import i18n from "../i18n";

test("should apply RTL direction when language is Arabic", async () => {
  await i18n.changeLanguage("ar");

  render(<DirectionHandler />);

  expect(document.documentElement.dir).toBe("rtl");
  expect(document.documentElement.lang).toBe("ar");
});