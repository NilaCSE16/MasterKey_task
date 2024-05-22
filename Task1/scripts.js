const container = document.querySelector(".container");
let currentPartition = null;
let resizing = false;
let startX, startY;

function generateRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

function createPartition(isVertical = true) {
  const partition = document.createElement("div");
  partition.classList.add("partition");
  partition.style.backgroundColor = generateRandomColor();

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const splitButton = document.createElement("button");
  splitButton.textContent = isVertical ? "V" : "H";
  splitButton.addEventListener("click", () => splitPartition(isVertical));

  const removeButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.addEventListener("click", () => removePartition(partition));

  buttons.appendChild(splitButton);
  buttons.appendChild(removeButton);
  partition.appendChild(buttons);

  if (isVertical) {
    const resizer = document.createElement("div");
    resizer.classList.add("resizer");
    resizer.addEventListener("mousedown", (event) => startResize(event, true));
    partition.appendChild(resizer);
  } else {
    const resizer = document.createElement("div");
    resizer.classList.add("resizer", "horizontal");
    resizer.addEventListener("mousedown", (event) => startResize(event, false));
    partition.appendChild(resizer);
  }

  container.appendChild(partition);
  return partition;
}

function splitPartition(isVertical) {
  if (!currentPartition) return;

  const newPartition = createPartition(!isVertical);
  const currentRect = currentPartition.getBoundingClientRect();
  const newSize = isVertical ? currentRect.width / 2 : currentRect.height / 2;

  currentPartition.style.flex = `1 0 ${newSize}px`;
  newPartition.style.flex = `1 0 ${newSize}px`;

  if (isVertical) {
    currentPartition.classList.add("resizable");
    newPartition.style.left = `${newSize}px`;
  } else {
    currentPartition.classList.add("resizable", "horizontal");
    newPartition.style.top = `${newSize}px`;
  }
}

function removePartition(partition) {
  if (container.children.length === 1) return;
  container.removeChild(partition);
}

function startResize(event, isVertical) {
  resizing = true;
  currentPartition = event.target.parentElement;
  startX = event.clientX;
  startY = event.clientY;

  if (isVertical) {
    currentPartition.classList.add("resizable");
  } else {
    currentPartition.classList.add("resizable", "horizontal");
  }

  document.addEventListener("mousemove", resizePartition);
  document.addEventListener("mouseup", stopResize);
}

function resizePartition(event) {
  if (!resizing) return;

  const diffX = event.clientX - startX;
  const diffY = event.clientY - startY;

  const currentRect = currentPartition.getBoundingClientRect();
  let newSize;

  if (currentPartition.classList.contains("horizontal")) {
    newSize = Math.max(100, currentRect.width + diffX);

    // Snap to 1/4, 1/2, 3/4 based on cursor position relative to partition size
    const snapPoints = [
      currentRect.width / 4,
      currentRect.width / 2,
      (currentRect.width * 3) / 4,
    ];
    const closestSnap = snapPoints.reduce(
      (prev, curr) =>
        Math.abs(curr - event.clientX) < Math.abs(prev - event.clientX)
          ? curr
          : prev,
      diffX + currentRect.width
    );
    newSize = Math.round(closestSnap);
  } else {
    newSize = Math.max(100, currentRect.height + diffY);

    // Snap to 1/4, 1/2, 3/4 for vertical resizing
    const snapPoints = [
      currentRect.height / 4,
      currentRect.height / 2,
      (currentRect.height * 3) / 4,
    ];
    const closestSnap = snapPoints.reduce(
      (prev, curr) =>
        Math.abs(curr - event.clientY) < Math.abs(prev - event.clientY)
          ? curr
          : prev,
      diffY + currentRect.height
    );
    newSize = Math.round(closestSnap);

    const sibling = currentPartition.nextElementSibling;
    if (sibling) {
      sibling.style.flex = `1 0 calc(100% - ${newSize}px)`;
    }
  }

  currentPartition.style.width = `${newSize}px`;
  currentPartition.style.height = `${newSize}px`;
}

function stopResize() {
  resizing = false;
  currentPartition.classList.remove("resizable", "resizable-horizontal");
  document.removeEventListener("mousemove", resizePartition);
  document.removeEventListener("mouseup", stopResize);
}

createPartition(); // Create initial partition
