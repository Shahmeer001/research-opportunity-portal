const API_BASE_URL = "http://localhost:8000/api";

export async function fetchOpportunities() {
  const response = await fetch(`${API_BASE_URL}/opportunities`);
  if (!response.ok) {
    throw new Error(`Failed to fetch opportunities: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchOpportunityById(id) {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch opportunity: ${response.statusText}`);
  }
  return response.json();
}

export async function createOpportunity(data) {
  const response = await fetch(`${API_BASE_URL}/opportunities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to create opportunity");
  }
  return response.json();
}

export async function updateOpportunity(id, data) {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to update opportunity");
  }
  return response.json();
}

export async function deleteOpportunity(id) {
  const response = await fetch(`${API_BASE_URL}/opportunities/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to delete opportunity");
  }
  return response.json();
}
