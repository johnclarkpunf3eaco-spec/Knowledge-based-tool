function showTab(tabId) {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => button.classList.remove('active'));
  tabContents.forEach(content => content.classList.add('hidden'));

  document.getElementById(tabId).classList.remove('hidden');
  const clickedButton = Array.from(tabButtons).find(btn =>
    btn.textContent.toUpperCase().includes(tabId.toUpperCase())
  );
  if (clickedButton) clickedButton.classList.add('active');
}

const tabButtons = document.querySelectorAll('.tab-button');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');
    });
});
function toggleInputVisibility(checkboxId, inputId) {
  const checkbox = document.getElementById(checkboxId);
  const input = document.getElementById(inputId);

  if (checkbox.checked) {
    input.style.display = "block";
  } else {
    input.style.display = "none";
    input.value = "";
  }

  updateActionsTaken();
}
function updateActionsTaken() {
  const accountID = document.getElementById("accountID").value || "";
  const name = document.getElementById("name").value || "";

  const pastDueCheckbox = document.getElementById("chkPastDue");
  const remBalCheckbox = document.getElementById("chkRemBal");
  const epODayCheckbox = document.getElementById("chkEpoDay");
  const merchRecCheckbox = document.getElementById("chkMerchRec");

  const pastDue = pastDueCheckbox.checked ? document.getElementById("pastDue").value : null;
  const remBal = remBalCheckbox.checked ? document.getElementById("remBal").value : null;
  const epODay = epODayCheckbox.checked ? document.getElementById("epODay").value : null;

  const actionsInput = document.getElementById("actions").value || "";

  let direction = "";
  const radios = document.getElementsByName("callDirection");
  radios.forEach(radio => {
    if (radio.checked) {
      direction = radio.value;
    }
  });

  // Start building note

  
  let note = "";

  // Place ***MR*** at the top if checkbox is checked
  if (merchRecCheckbox && merchRecCheckbox.checked) {
    note += "***MR***\n";
  }

  note += `Call Direction: ${direction}
Account ID: ${accountID}
Name: ${name}`;

  if (pastDue !== null && pastDue.trim() !== "") {
    note += `\nPast Due: ${pastDue}`;
  }
  if (remBal !== null && remBal.trim() !== "") {
    note += `\nRemaining Contract Balance: ${remBal}`;
  }
  if (epODay !== null && epODay.trim() !== "") {
    note += `\nEPO/90Day: ${epODay}`;
  }

  // Add Actions field at the end
  if (actionsInput.trim() !== "") {
    note += `\nActions: ${actionsInput.trim()}`;
  }

  document.getElementById("actionsTaken").value = note;
}
function copyText(tabId) {
  let content;

  switch (tabId) {
    case 'signup':
      content = document.getElementById("actionsTaken");
      break;
    case 'signin':
      content = document.querySelector("#signin select");
      break;
    case 'subscribe':
      content = document.querySelector("#subscribe input[type='email']");
      break;
    case 'contact':
      content = document.getElementById("actionsTakens");
      break;
    default:
      alert("Invalid tab");
      return;
  }

  if (content.select) {
    content.select();
  } else {
    // fallback for select elements (dropdown)
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = content.value || content.options[content.selectedIndex].value || "";
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    content = tempTextarea;
  }

  content.setSelectionRange?.(0, 99999);

  try {
    document.execCommand("copy");
    alert("Note copied to clipboard!");
  } catch (err) {
    alert("Failed to copy text");
  }

  if (content.tagName === "TEXTAREA") {
    document.body.removeChild(content);
  }

  window.getSelection().removeAllRanges();
}

function clearForm(tabId) {
  switch (tabId) {
    case 'signup':
      document.getElementById("accountID").value = "";
      document.getElementById("name").value = "";
      document.getElementById("pastDue").value = "";
      document.getElementById("remBal").value = "";
      document.getElementById("epODay").value = "";
      document.getElementById("actions").value = "";
      document.getElementById("actionsTaken").value = "";
      document.getElementById("chkPastDue").checked = false;
      document.getElementById("chkRemBal").checked = false;
      document.getElementById("chkEpoDay").checked = false;
      document.getElementById("pastDue").style.display = "none";
      document.getElementById("remBal").style.display = "none";
      document.getElementById("epODay").style.display = "none";
      const radios = document.getElementsByName("callDirection");
      radios.forEach(radio => radio.checked = false);
      break;
    case 'signin':
      document.querySelector("#signin select").selectedIndex = 0;
      break;
    case 'subscribe':
      document.querySelector("#subscribe input[type='email']").value = "";
      break;
    case 'contact':
      document.getElementById("case").value = "";
      document.getElementById("chapter").value = "";
      document.getElementById("attNm").value = "";
      document.getElementById("attCtn").value = "";
      document.getElementById("adiN").value = "";
      document.getElementById("actionsTakens").value = "";
      break;
  }
}

function updateBankruptcyNote() {
  const caseNum = document.getElementById("case").value;
  const chapter = document.getElementById("chapter").value;
  const attNm = document.getElementById("attNm").value;
  const attCtn = document.getElementById("attCtn").value;
  const adiN = document.getElementById("adiN").value;

  const result = `***BKO***
Case#: ${caseNum}
Chapter: ${chapter}
Attorney: ${attNm}
Contact: ${attCtn}
Notes: ${adiN}`;

  document.getElementById("actionsTakens").value = result;
}

function copySelectedOption() {
  const select = document.getElementById("select");
  const selectedValue = select.value;

  if (selectedValue) {
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = selectedValue;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      alert(`Copied: ${selectedValue}`);
    } catch (err) {
      alert("Failed to copy text");
    }

    document.body.removeChild(tempTextarea);
  }
}