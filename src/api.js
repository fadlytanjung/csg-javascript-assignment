export async function fetchPosts() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error(`Server Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching posts:", err);
    return { error: true, message: "Failed to load posts." };
  }
}

export async function fetchComments(postId) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    if (!res.ok) throw new Error(`Server Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Error fetching comments for post ${postId}:`, err);
    return [];
  }
}
