import { fetchPosts } from "./api.js";
import { rerumEl, userReportBody } from "./dom.js";
import { createUserReportRow } from "./templates.js";

fetchPosts().then((posts) => {
  const rerumPosts = posts.filter((p) => p.body.includes("rerum"));
  rerumEl.textContent = `${rerumPosts.length} posts contain the word "rerum".`;

  const userCount = {};
  posts.forEach((p) => {
    userCount[p.userId] = (userCount[p.userId] || 0) + 1;
  });

  Object.entries(userCount).forEach(([userId, count]) => {
    const tr = createUserReportRow(userId, count);
    userReportBody.appendChild(tr);
  });
});
