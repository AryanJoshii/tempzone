// new Date().toLocaleString("en-IN",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric", dayperiod:"short"});
import { API_URL } from "./require.js";

const table = document.getElementById("template-table");
const count = document.getElementById("total-data");

const dateOptions = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", dayperiod: "short" }

async function fetchTemplates() {
    try {
        const templateResponse = await fetch(`${API_URL}/admin/template/fetch.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        const templateList = await templateResponse.json();
        appendTableRows(templateList.data);
        count.innerText = templateList.data.length;
    } catch (error) {
        console.log(error);
    }
}

function appendTableRows(templates) {
    const fieldsToInclude = [
        'template_id',
        'template_name',
        'template_category',
        'template_owner',
        'created_at',
        'updated_at',
    ];

    templates.forEach(template => {
        const row = document.createElement('tr');
        row.dataset.templateId = template.template_id;

        fieldsToInclude.forEach(field => {
            const cell = document.createElement('td');
            if (field === 'created_at' || field === 'updated_at') {
                let formattedDate = new Date(template[field]).toLocaleString("en-IN", dateOptions);
                cell.textContent = formattedDate;
                row.appendChild(cell);
                return;
            }
            cell.textContent = template[field];
            row.appendChild(cell);
        });

        const iconCell = document.createElement('td');
        const deleteIcon = document.createElement("img");
        deleteIcon.id = "templete-delete-btn";
        deleteIcon.src = "assets/icons/delete.svg";

        iconCell.appendChild(deleteIcon)
        row.appendChild(iconCell)

        table.appendChild(row);
    });
}

window.addEventListener("load", () => {
    fetchTemplates();
})