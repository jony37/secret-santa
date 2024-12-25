const participants = [
  "Жонпулат", "Асадбек", "Улугбек", "Мухаммад", "Бобур", "Зарина", 
  "Вова", "Дилнаво", "Мехрибон", "Бехруз", "Аброр", "Озодбек", 
  "Отабек", "Нодир", "Жахон", "Муниса"
];

let remainingParticipants = JSON.parse(localStorage.getItem("remainingParticipants")) || [...participants];
let clickedParticipants = JSON.parse(localStorage.getItem("clickedParticipants")) || {}; // Состояние для каждого участника

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
  localStorage.setItem("remainingParticipants", JSON.stringify(remainingParticipants));
}

// Обработчик кнопки выбора участника
document.getElementById("draw").addEventListener("click", function () {
  // Проверяем, кто нажимает кнопку
  const currentUser = prompt("Введите ваше имя:");

  if (!currentUser) {
    alert("Имя не введено!");
    return;
  }

  // Проверка, что участник еще не нажимал кнопку
  if (clickedParticipants[currentUser]) {
    alert("Вы уже нажимали кнопку!");
    return;
  }

  if (remainingParticipants.length === 0) {
    document.getElementById("result").textContent = "Все подарки розданы!";
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingParticipants.length);
  const chosenName = remainingParticipants[randomIndex];
  remainingParticipants.splice(randomIndex, 1);

  document.getElementById("result").textContent = `Получатель подарка: ${chosenName}`;
  clickedParticipants[currentUser] = true; // Помечаем, что участник нажал кнопку
  updateRemainingList();

  // Сохраняем состояние в localStorage
  localStorage.setItem("clickedParticipants", JSON.stringify(clickedParticipants));
});

// Обработчик кнопки сброса игры
document.getElementById("reset").addEventListener("click", function () {
  remainingParticipants = [...participants];
  clickedParticipants = {}; // Сброс состояния для всех участников
  localStorage.removeItem("remainingParticipants");
  localStorage.removeItem("clickedParticipants");

  document.getElementById("result").textContent = "Игра сброшена. Начните заново.";
  updateRemainingList();
});

// Инициализация отображения
updateRemainingList();