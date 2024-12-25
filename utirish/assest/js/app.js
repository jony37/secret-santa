const participants = [
  "Жонпулат",
  "Асадбек",
  "Улугбек",
  "Мухаммад",
  "Бобур",
  "Зарина",
  "Вова",
  "Дилнаво",
  "Мехрибон",
  "Бехруз",
  "Аброр",
  "Озодбек",
  "Отабек",
  "Нодир",
  "Жахон",
  "Муниса",
];

// Инициализация: загружаем из localStorage или создаём новый список
let remainingParticipants = JSON.parse(
  localStorage.getItem("remainingParticipants")
) || [...participants];
let clicked = JSON.parse(localStorage.getItem("clicked")) || false; // Флаг для блокировки кнопки

// Функция обновления оставшихся участников
function updateRemainingList() {
  const remainingList = document.getElementById("remaining");
  remainingList.innerHTML = "";
  remainingParticipants.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    remainingList.appendChild(li);
  });

  // Сохраняем обновлённый список в localStorage
  localStorage.setItem(
    "remainingParticipants",
    JSON.stringify(remainingParticipants)
  );
}

// Отключение кнопки для предотвращения повторного нажатия
function disableButton() {
  document.getElementById("draw").disabled = true;
  clicked = true;
  localStorage.setItem("clicked", JSON.stringify(clicked));
}

// Восстановление состояния кнопки при загрузке страницы
function restoreButtonState() {
  if (clicked) {
    document.getElementById("draw").disabled = true;
  }
}

// Обработчик кнопки выбора участника
document.getElementById("draw").addEventListener("click", function () {
  if (remainingParticipants.length === 0) {
    document.getElementById("result").textContent = "Все подарки розданы!";
    disableButton();
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingParticipants.length);
  const chosenName = remainingParticipants[randomIndex];
  remainingParticipants.splice(randomIndex, 1);

  document.getElementById(
    "result"
  ).textContent = `Получатель подарка: ${chosenName}`;
  updateRemainingList();

  // Отключаем кнопку после нажатия
  disableButton();
});

// Обработчик кнопки сброса игры
// document.getElementById("reset").addEventListener("click", function () {
//   remainingParticipants = [...participants];
//   clicked = false;
//   localStorage.removeItem("remainingParticipants");
//   localStorage.removeItem("clicked");
//   document.getElementById("draw").disabled = false;
//   document.getElementById("result").textContent =
//     "Игра сброшена. Начните заново.";
//   updateRemainingList();
// });

// Инициализация отображения
updateRemainingList();
restoreButtonState();
