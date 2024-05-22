const partitions = document.querySelectorAll(".partition");
const container = document.querySelector(".container");

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function splitPartition(partition, direction) {
  const newPartition = document.createElement("div");
  newPartition.classList.add("partition");
  newPartition.classList.add("resizable");
  // newPartition.dataset.resizable = true;
  newPartition.style.backgroundColor = getRandomColor();

  const buttonV = document.createElement("button");
  buttonV.textContent = "V";
  buttonV.addEventListener("click", () =>
    splitPartition(newPartition, "vertical")
  );

  const buttonH = document.createElement("button");
  buttonH.textContent = "H";
  buttonH.addEventListener("click", () =>
    splitPartition(newPartition, "horizontal")
  );

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "-";
  removeBtn.addEventListener("click", () => {
    const partition = removeBtn.closest(".partition");
    if (partition) {
      partition.parentNode.removeChild(partition);
    }
  });

  const currentElement = document.activeElement;

  // 2. Find the Closest Partition Element
  let closestPartition = currentElement.closest(".partition"); // Adjust selector if needed
  // console.log(closestPartition);

  if (direction === "vertical") {
    closestPartition.style.flexDirection = "row";
    closestPartition.appendChild(newPartition);
    // partition.style.flexDirection = "row";
    // partition.appendChild(newPartition);
    console.log(direction);
  } else if (direction === "horizontal") {
    closestPartition.appendChild(newPartition);
    console.log(direction);
  }

  newPartition.appendChild(buttonV);
  newPartition.appendChild(buttonH);
  newPartition.appendChild(removeBtn);
}

partitions.forEach((partition) => {
  partition.addEventListener("click", (event) => {
    // console.log(event);
    if (event.target.tagName === "BUTTON" && event.target.textContent === "V") {
      splitPartition(partition, "vertical");
    } else if (
      event.target.tagName === "BUTTON" &&
      event.target.textContent === "H"
    ) {
      splitPartition(partition, "horizontal");
    }
    // partition.classList.add("resizable");
  });

  // partition.addEventListener("click", () => {
  //   partition.classList.add("resizable");
  // });

  // document.addEventListener("mouseup", () => {
  //   partitions.forEach((p) => p.classList.remove("resizable"));
  // });
});
