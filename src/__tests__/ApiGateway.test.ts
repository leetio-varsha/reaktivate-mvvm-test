import ApiGateway from "services/ApiGateway";

global.fetch = jest.fn();

process.env.REACT_APP_API_URL = "https://api.example.com";

describe("ApiGateway", () => {
  let api: ApiGateway;
  let apiURL: string;

  beforeEach(() => {
    api = new ApiGateway();
    apiURL = process.env.REACT_APP_API_URL!;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it("uses the correct REACT_APP_API_URL in API calls", () => {
    expect(apiURL).toBe("https://api.example.com");
  });

  it("handles a successful GET request correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify([{ id: 1, name: "Mock Data" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const data = await api.get("/test");

    expect(data).toEqual([{ id: 1, name: "Mock Data" }]);
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/test`, expect.any(Object));
  });

  it("handles a 404 GET request gracefully", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(null, {
        status: 404,
        statusText: "Not Found",
      })
    );

    await expect(api.get("/test")).rejects.toThrow("HTTP Error: 404 Not Found");

    expect(fetch).toHaveBeenCalledWith(`${apiURL}/test`, expect.any(Object));
  });

  it("handles a 500 GET request gracefully", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      })
    );

    await expect(api.get("/error")).rejects.toThrow("HTTP Error: 500 Internal Server Error");

    expect(fetch).toHaveBeenCalledWith(`${apiURL}/error`, expect.any(Object));
  });

  it("parses JSON responses correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const data = await api.get("/json");

    expect(data).toEqual({ success: true });
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/json`, expect.any(Object));
  });

  it("handles successful POST requests", async () => {
    const mockData = { id: 1, name: "New Item" };

    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockData), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await api.post("/create", { name: "New Item" });

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Item" }),
    });
  });

  it("handles POST requests with error responses", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    (fetch as jest.Mock).mockResolvedValueOnce(
      new Response(null, {
        status: 400,
        statusText: "Bad Request",
      })
    );

    await expect(api.post("/create", { name: "Invalid Item" })).rejects.toThrow("HTTP Error: 400 Bad Request");

    expect(fetch).toHaveBeenCalledWith(`${apiURL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Invalid Item" }),
    });
  });
});
