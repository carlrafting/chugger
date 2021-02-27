import { assertEquals, assertNotEquals } from "../../deps_test.js";
import welcome from "./welcome.js";

Deno.test("welcome", () => {
  const result = welcome();
  assertEquals(typeof result, "string");
  assertNotEquals(typeof result, undefined);
});
