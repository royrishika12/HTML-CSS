// ===== Navigation =====
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
  document.getElementById('page-title').innerText =
    sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
}

// ===== Sample Data for 28 States =====
const statesData = [
  { state: "Andhra Pradesh", residents: 500000, registered: 120000, disease: 12 },
  { state: "Arunachal Pradesh", residents: 150000, registered: 40000, disease: 9 },
  { state: "Assam", residents: 600000, registered: 180000, disease: 15 },
  { state: "Bihar", residents: 1200000, registered: 450000, disease: 18 },
  { state: "Chhattisgarh", residents: 450000, registered: 150000, disease: 11 },
  { state: "Delhi", residents: 1000000, registered: 700000, disease: 7 },
  { state: "Goa", residents: 120000, registered: 50000, disease: 5 },
  { state: "Gujarat", residents: 950000, registered: 300000, disease: 13 },
  { state: "Haryana", residents: 480000, registered: 200000, disease: 14 },
  { state: "Himachal Pradesh", residents: 180000, registered: 80000, disease: 10 },
  { state: "Jharkhand", residents: 500000, registered: 170000, disease: 12 },
  { state: "Karnataka", residents: 950000, registered: 400000, disease: 16 },
  { state: "Kerala", residents: 850000, registered: 420000, disease: 8 },
  { state: "Madhya Pradesh", residents: 1100000, registered: 380000, disease: 19 },
  { state: "Maharashtra", residents: 1500000, registered: 600000, disease: 20 },
  { state: "Manipur", residents: 130000, registered: 50000, disease: 6 },
  { state: "Meghalaya", residents: 140000, registered: 60000, disease: 9 },
  { state: "Mizoram", residents: 120000, registered: 45000, disease: 7 },
  { state: "Nagaland", residents: 110000, registered: 40000, disease: 8 },
  { state: "Odisha", residents: 700000, registered: 240000, disease: 15 },
  { state: "Punjab", residents: 600000, registered: 300000, disease: 12 },
  { state: "Rajasthan", residents: 950000, registered: 310000, disease: 16 },
  { state: "Sikkim", residents: 80000, registered: 30000, disease: 5 },
  { state: "Tamil Nadu", residents: 1200000, registered: 500000, disease: 14 },
  { state: "Telangana", residents: 800000, registered: 280000, disease: 12 },
  { state: "Tripura", residents: 160000, registered: 60000, disease: 10 },
  { state: "Uttar Pradesh", residents: 2000000, registered: 750000, disease: 22 },
  { state: "Uttarakhand", residents: 300000, registered: 120000, disease: 9 },
  { state: "West Bengal", residents: 1400000, registered: 500000, disease: 17 }
];

// ===== Populate State Table =====
const tableBody = document.querySelector("#statesTable tbody");
statesData.forEach(s => {
  const row = `<tr>
    <td>${s.state}</td>
    <td>${s.residents.toLocaleString()}</td>
    <td>${s.registered.toLocaleString()}</td>
    <td>${s.disease}%</td>
  </tr>`;
  tableBody.innerHTML += row;
});

// ===== Totals =====
const totalResidents = statesData.reduce((sum, s) => sum + s.residents, 0);
const totalRegistered = statesData.reduce((sum, s) => sum + s.registered, 0);
const avgPrediction = (statesData.reduce((sum, s) => sum + s.disease, 0) / statesData.length).toFixed(1);

document.getElementById("totalResidents").innerText = totalResidents.toLocaleString();
document.getElementById("totalRegistered").innerText = totalRegistered.toLocaleString();
document.getElementById("avgPrediction").innerText = avgPrediction + "%";

// ===== Charts =====
const overviewChart = new Chart(document.getElementById("overviewChart"), {
  type: "bar",
  data: {
    labels: statesData.map(s => s.state),
    datasets: [
      { label: "Residents", data: statesData.map(s => s.residents), backgroundColor: "#0a74da" },
      { label: "Registered", data: statesData.map(s => s.registered), backgroundColor: "#3bc9db" }
    ]
  }
});

const diseaseChart = new Chart(document.getElementById("diseaseChart"), {
  type: "line",
  data: {
    labels: statesData.map(s => s.state),
    datasets: [
      { label: "Disease Prediction %", data: statesData.map(s => s.disease), borderColor: "#ff6b6b", fill: false }
    ]
  }
});