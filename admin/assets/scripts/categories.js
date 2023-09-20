// new Date().toLocaleString("en-IN",{day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric", dayperiod:"short"});
import { API_URL } from "./require.js";

const table = document.getElementById("category-table");
const count = document.getElementById("total-data");

const dateOptions = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", dayperiod: "short" }

async function fetchCategories() {
    try {
        const categoryResponse = await fetch(`${API_URL}/admin/category/fetch.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        const categoryList = await categoryResponse.json();
        appendTableRows(categoryList.data);
        count.innerText = categoryList.data.length;
    } catch (error) {
        console.log(error);
    }
}

function appendTableRows(categories) {
    const fieldsToInclude = [
        'category_id',
        'category_name',
        'created_at',
        'updated_at',
    ];

    categories.forEach(category => {
        const row = document.createElement('tr');
        row.dataset.categoryId = category.category_id;

        fieldsToInclude.forEach(field => {
            const cell = document.createElement('td');
            if (field === 'created_at' || field === 'updated_at') {
                let formattedDate = new Date(category[field]).toLocaleString("en-IN", dateOptions);
                cell.textContent = formattedDate;
                row.appendChild(cell);
                return;
            }
            cell.textContent = category[field];
            row.appendChild(cell);
        });

        const iconCell = document.createElement('td');
        const deleteIcon = document.createElement("img");
        deleteIcon.id = "category-delete-btn";
        deleteIcon.src = "assets/icons/delete.svg";

        iconCell.appendChild(deleteIcon)
        row.appendChild(iconCell)

        table.appendChild(row);
    });
}

window.addEventListener("load", () => {
    fetchCategories();
})