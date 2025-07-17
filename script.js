let busData = [];

async function loadBusData() {
  try {
    const res = await fetch('busData.json');
    busData = await res.json();
  } catch (err) {
    console.error("Error loading busData.json:", err);
  }
}

function checkBus() {
  const dest = document.getElementById("destination").value.trim().toLowerCase();
  const bus = document.getElementById("busNumber").value.trim().toUpperCase();
  const resultBox = document.getElementById("result");

  if (!dest || !bus) {
    alert("Please fill in both fields.");
    return;
  }

  const route = busData.find(r => r.busNumber === bus);
  if (!route) {
    resultBox.textContent = `❌ Bus number ${bus} not found.`;
    resultBox.className = "result fail";
    return;
  }

  const match = route.stops.some(stop => stop.toLowerCase().includes(dest));
  if (match) {
    resultBox.textContent = `✅ Yes! Bus ${bus} passes through "${dest}".`;
    resultBox.className = "result success";
  } else {
    resultBox.textContent = `❌ No, Bus ${bus} does not stop at "${dest}".`;
    resultBox.className = "result fail";
  }
}

window.onload = loadBusData;
