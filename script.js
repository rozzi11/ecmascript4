function getUsersFromAPI() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("users", JSON.stringify(data));
        displayUsers(data);
      });
  }
  
  function displayUsers(users) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    users.forEach(user => {
      const userItem = document.createElement("li");
      userItem.textContent = user.name;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.addEventListener("click", () => {
        removeUser(user.id);
      });
      
      userItem.appendChild(deleteButton);
      userList.appendChild(userItem);
    });
  }
  
  function removeUser(userId) {
    const users = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    displayUsers(updatedUsers);
  }
  
  window.onload = function() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users && Array.isArray(users) && users.length > 0) {
      displayUsers(users);
    } else {
      getUsersFromAPI();
    }
  };