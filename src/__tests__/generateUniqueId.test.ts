import { generateUniqueId } from "utils/generateUniqueId";

describe("generateUniqueId", () => {
  it("should return a string", () => {
    const id = generateUniqueId();
    expect(typeof id).toBe("string");
  });

  it("should generate unique IDs on multiple calls", () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
  });

  it("should generate IDs of expected length", () => {
    const id = generateUniqueId();
    expect(id.length).toBeGreaterThan(10);
  });
});
