document.addEventListener("DOMContentLoaded", () => {
    const jobForm = document.getElementById('jobForm');
    const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];

    // Load jobs from localStorage
    loadJobsFromLocalStorage();

    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientName = document.getElementById('clientName').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const jobStatus = document.getElementById('jobStatus').value;
        const hoursWorked = document.getElementById('hoursWorked').value;

        const jobData = {
            clientName,
            jobDescription,
            jobStatus,
            hoursWorked
        };

        addJobToTable(jobData);
        saveJobToLocalStorage(jobData);
        jobForm.reset();
    });

    function addJobToTable(jobData) {
        const newRow = jobTable.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        const clientButton = document.createElement('button');
        clientButton.innerText = jobData.clientName;
        clientButton.classList.add('client-button');
        clientButton.addEventListener('click', () => {
            openClientCard(jobData);
        });

        cell1.appendChild(clientButton);
        cell2.innerText = jobData.jobDescription;
        cell3.innerText = jobData.jobStatus;
        cell4.innerText = jobData.hoursWorked;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Elimina';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            jobTable.deleteRow(newRow.rowIndex - 1);
            removeJobFromLocalStorage(jobData);
        });

        cell5.appendChild(deleteButton);
    }

    function openClientCard(jobData) {
        const clientWindow = window.open('client.html', '_blank');
        clientWindow.onload = function () {
            clientWindow.document.getElementById('clientName').innerText = jobData.clientName;
            clientWindow.document.getElementById('jobDescription').innerText = jobData.jobDescription;
            clientWindow.document.getElementById('jobStatus').innerText = jobData.jobStatus;
            clientWindow.document.getElementById('hoursWorked').innerText = jobData.hoursWorked;
        };
    }

    function saveJobToLocalStorage(jobData) {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs.push(jobData);
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }

    function removeJobFromLocalStorage(jobData) {
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs = jobs.filter(job => job.clientName !== jobData.clientName ||
            job.jobDescription !== jobData.jobDescription ||
            job.jobStatus !== jobData.jobStatus ||
            job.hoursWorked !== jobData.hoursWorked);
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }

    function loadJobsFromLocalStorage() {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        jobs.forEach(jobData => {
            addJobToTable(jobData);
        });
    }
});
