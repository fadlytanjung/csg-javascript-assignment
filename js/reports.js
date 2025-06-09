import { fetchPosts } from "./api.js";

const rerumEl = document.getElementById("rerum-count");
const userReportBody = document.getElementById("user-report");

fetchPosts().then((posts) => {
  const rerumPosts = posts.filter((p) => p.body.includes("rerum"));
  rerumEl.textContent = `${rerumPosts.length} posts contain the word "rerum".`;

  const userCount = {};
  posts.forEach((p) => {
    userCount[p.userId] = (userCount[p.userId] || 0) + 1;
  });

  for (const [userId, count] of Object.entries(userCount)) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="border p-2">${userId}</td><td class="border p-2">${count}</td>`;
    userReportBody.appendChild(tr);
  }
});
