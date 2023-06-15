import { sum } from "./testing";

test("sum two given numbers", () => {
	const a = 5;
	const b = 4;
	expect(sum(a, b)).toBe(9);
})