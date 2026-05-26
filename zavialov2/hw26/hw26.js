console.log("#9. JavaScript homework example file");

/*
 * #1
 * Відстежування кліку на кнопку
 */

function handleButtonClick(buttonId, message) {
  const button = document.getElementById(buttonId);

  if (button) {
    button.addEventListener("click", function () {
      console.log(message);
    });
  }
}

// Виклик функції
handleButtonClick("myButton", "Button clicked!");

/*
 * #2
 * Відстеження позиції курсору миші
 */

function trackMousePosition() {
  document.addEventListener("mousemove", function (event) {
    console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
  });
}

trackMousePosition();

/*
 * #3
 * Делегування подій
 */

function createTestList() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <ul id="testList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    `,
  );
}

// Створюємо список
createTestList();

function setupEventDelegation(selector) {
  const list = document.querySelector(selector);

  if (list) {
    list.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        console.log(`Item clicked: ${event.target.textContent.trim()}`);
      }
    });
  }
}

// Виклик функції
setupEventDelegation("#testList");

// Експорт
export { handleButtonClick, trackMousePosition, setupEventDelegation };
