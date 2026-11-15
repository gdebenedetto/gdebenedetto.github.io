document.querySelector("#zip").addEventListener("change", displayCity);
loadStates();
document.querySelector("#state").addEventListener("change", loadCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", validateForm);
document.querySelector("#password").addEventListener("focus", suggestPassword);

async function displayCity() {
//   alert(document.querySelector("#zip").value);
    try {
        let zipCode = document.querySelector("#zip").value;
        let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();

        //the API returns false when the zip code is not found, so we can fcheck for that case before trying to access thecity property
        if (data === false) {
            document.querySelector("#zipError").textContent = "Zip code not found";
            document.querySelector("#city").textContent = "";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }
        document.querySelector("#zipError").textContent = "";
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;

    } catch (error) {
        document.querySelector("#city").textContent = "Unable to retrieve city";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        console.error(error);
    }

    

}

async function loadStates() {
  let stateMenu = document.querySelector("#state");

  stateMenu.textContent = "";

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  stateMenu.appendChild(defaultOption);

  try {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for (let item of data) {
      let option = document.createElement("option");
      option.value = item.usps;
      option.textContent = item.state;
      stateMenu.appendChild(option);
    }
  } catch (error) {
    console.error(error);

    stateMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load states";
    stateMenu.appendChild(errorOption);
  }
}

async function loadCounties() {
  let countyMenu = document.querySelector("#county");
  let state = document.querySelector("#state").value.toLowerCase();

  countyMenu.textContent = "";

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  countyMenu.appendChild(defaultOption);

  if (state === "") {
    return;
}

  try {
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();

    for (let item of data) {
      let option = document.createElement("option");
      option.value = item.county;
      option.textContent = item.county;
      countyMenu.appendChild(option);
    }
  } catch (error) {
    console.error(error);

    countyMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load counties";
    countyMenu.appendChild(errorOption);
  }
}

async function checkUsername() {
  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    return false;
  }

  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data.available) {
    usernameError.textContent = "Username available!";
    usernameError.style.color = "green";
    return true;
  } else {
    usernameError.textContent = "Username taken";
    usernameError.style.color = "red";
    return false;
  }
}

async function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");
  let password = document.querySelector("#password").value;
  let passwordAgain = document.querySelector("#passwordAgain").value;
  let passwordError = document.querySelector("#passwordError");

  usernameError.textContent = "";
  passwordError.textContent = "";

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    isValid = false;
  } else {
    let usernameAvailable = await checkUsername();

    if (usernameAvailable === false) {
        isValid = false;
    }
  }

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    passwordError.style.color = "red";
    isValid = false;
  } else if (password !== passwordAgain) {
    passwordError.textContent = "Passwords do not match";
    passwordError.style.color = "red";
    isValid = false;
  }

  if (isValid) {
    document.querySelector("#signupForm").submit();
  }
}

async function suggestPassword() {
    try {
        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);
        let data = await response.json();

        document.querySelector("#suggestedPassword").textContent =
            "Suggested password: " + data.password;

    } catch (error) {
        console.error(error);
        document.querySelector("#suggestedPassword").textContent =
            "Unable to generate password";
    }
}