const API_BASE_URL = "http://localhost:5001";

export async function getCalls() {
  const response = await fetch(`${API_BASE_URL}/api/calls`);

  if (!response.ok) {
    throw new Error("Failed to fetch calls");
  }

  return response.json();
}