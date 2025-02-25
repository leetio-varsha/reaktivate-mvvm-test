const API_BASE: string = process.env.REACT_APP_API_BASE || "https://api.example.com";

export default class ApiGateway {
  private handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const error: Error & { status?: number } = new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      error.status = response.status;
      throw error;
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new Error("Invalid JSON response received");
    }
  };

  public get = async <T>(path: string, headers: Record<string, string> = {}): Promise<T> => {
    try {
      const response: Response = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers,
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("[ApiGateway GET Error]", error);
      throw error;
    }
  };

  public post = async <T>(path: string, payload: object, headers: Record<string, string> = {}): Promise<T> => {
    try {
      const response: Response = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(payload),
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("[ApiGateway POST Error]", error);
      throw error;
    }
  };

  public put = async <T>(path: string, payload?: object, headers: Record<string, string> = {}): Promise<T> => {
    try {
      const response: Response = await fetch(`${API_BASE}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: payload ? JSON.stringify(payload) : null,
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error("[ApiGateway PUT Error]", error);
      throw error;
    }
  };

  public request = async <T>(
    path: string,
    method: string = "GET",
    payload?: object,
    headers: Record<string, string> = {}
  ): Promise<T> => {
    try {
      const response: Response = await fetch(`${API_BASE}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: payload ? JSON.stringify(payload) : null,
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error(`[ApiGateway ${method} Error]`, error);
      throw error;
    }
  };
}
