const BASE = "http://127.0.0.1:8000/api/opportunities";
export const deleteOpportunity = (id) => request(`/${id}`, { method: "DELETE" });

export class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

async function request(path = "", options = {}) {
    let res;
    try {
        res = await fetch(BASE + path, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });
    } catch {
        throw new ApiError(0, "Cannot reach the server. Is the backend running?");
    }
    const body = await res.json().catch(() => null);
    if (!res.ok) {
        throw new ApiError(
            res.status,
            body?.detail ?? `Server returned ${res.status}`,
            body?.errors ?? []
        );
    }
    return body;
}

export const createOpportunity = (data) =>
    request("", { method: "POST", body: JSON.stringify(data) });
export const updateOpportunity = (id, data) =>
    request(`/${id}`, { method: "PUT", body: JSON.stringify(data) });