export async function fetchPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
