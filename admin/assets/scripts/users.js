// new Date().toLocaleString("en-IN",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric", dayperiod:"short"});
import { API_URL } from "./require.js";

const table = document.getElementById("user-table");
const count = document.getElementById("total-data");

const dateOptions = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", dayperiod: "short" }

async function fetchUsers() {
    try {
        const userResponse = await fetch(`${API_URL}/admin/user/fetchall.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        const userList = await userResponse.json();
        appendTableRows(userList.data);
        count.innerText = userList.data.length;
    } catch (error) {
        console.log(error);
    }
}

function appendTableRows(users) {
    const fieldsToInclude = [
        'user_id',
        'user_name',
        'user_email',
        'registered_at',
        'updated_at',
    ];

    users.forEach(user => {
        const row = document.createElement('tr');
        row.dataset.userId = user.user_id;

        fieldsToInclude.forEach(field => {
            const cell = document.createElement('td');
            if (field === 'registered_at' || field === 'updated_at') {
                let formattedDate = new Date(user[field]).toLocaleString("en-IN", dateOptions);
                cell.textContent = formattedDate;
                row.appendChild(cell);
                return;
            }
            cell.textContent = user[field];
            row.appendChild(cell);
        });

        const iconCell = document.createElement('td');
        const deleteIcon = document.createElement("img");
        deleteIcon.id = "user-delete-btn";
        deleteIcon.src = "assets/icons/delete.svg";

        iconCell.appendChild(deleteIcon)
        row.appendChild(iconCell)

        table.appendChild(row);
    });
}

window.addEventListener("load", () => {
    fetchUsers();
})