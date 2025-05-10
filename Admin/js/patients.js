document.addEventListener("DOMContentLoaded", function () {
    const patientForm = document.getElementById("addPatientForm");
    const patientsTable = document.getElementById("patientsTable");

    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    function renderPatients() {
        patientsTable.innerHTML = "";
        patients.forEach((patient, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.contact}</td>
                <td>${patient.condition}</td>
                <td>
                    <button class="btn edit-btn" onclick="editPatient(${index})"><i class="bi bi-pencil"></i> Edit</button>
                    <button class="btn delete-btn" onclick="deletePatient(${index})"><i class="bi bi-trash"></i> Delete</button>
                </td>
            `;
            patientsTable.appendChild(row);
        });
    }

    patientForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("patientName").value;
        const age = document.getElementById("patientAge").value;
        const gender = document.getElementById("patientGender").value;
        const contact = document.getElementById("patientContact").value;
        const condition = document.getElementById("patientCondition").value;

        patients.push({ name, age, gender, contact, condition });
        localStorage.setItem("patients", JSON.stringify(patients));
        renderPatients();
        patientForm.reset();
    });

    function searchPatients() {
        const query = document.getElementById("searchPatient").value.toLowerCase();
        const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(query));
        renderPatients(filteredPatients);
    }
// Function to open the Bootstrap modal
function openPatientModal() {
    var patientModal = new bootstrap.Modal(document.getElementById('addPatientModal'));
    patientModal.show();
}

    renderPatients();
});
