let courses = [];

function renderCourses(filter = "all") {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";

  const filtered = filter === "all" ? courses : courses.filter(c => c.category === filter);

  if (filtered.length === 0) {
    courseList.innerHTML = "<p class='text-muted'>No courses found in this category.</p>";
    return;
  }

  filtered.forEach(course => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-primary">${course.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted text-capitalize">${course.category}</h6>
          <p class="card-text">${course.description}</p>
        </div>
      </div>
    `;

    courseList.appendChild(col);
  });
}

async function loadCourses() {
  try {
    const res = await fetch("data/courses.json");
    courses = await res.json();
    renderCourses();
  } catch (err) {
    console.error("Failed to load courses:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("categoryFilter").addEventListener("change", e => {
    renderCourses(e.target.value);
  });

  loadCourses();
});
