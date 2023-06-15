import { checkMe } from './handleAuth'

const me = [{
	username: "user",
	id: 0,
	email: "user@example.com"
}]

describe("get user,if he's authorised", () => {
	beforeEach(() => {
		jest.spyOn(global, "fetch").mockResolvedValue({
			json: jest.fn().mockResolvedValue(me)
		} as any)
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("Get user", async () => {
		const user = await checkMe()
		expect(user).toBe(me)
	})
})