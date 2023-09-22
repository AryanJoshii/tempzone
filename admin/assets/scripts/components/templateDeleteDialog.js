import { API_URL } from "../require.js";

let templateId = null;

const table = document.getElementById("template-table");
const closeDialogBtns = document.querySelectorAll(".close-dialog-btn");
const confirmBtn = document.getElementById("confirm-delete-template");
const templateDeleteDialog = document.getElementById("template-delete-dialog");

function openTempDeleteDialog() {
    templateDeleteDialog.showModal();
}

function closeTempDeleteDialog() {
    templateDeleteDialog.close();
    templateId = null;
}

async function deleteUserTemplate() {
    try {
        const createTemplate = await fetch(`${API_URL}/admin/template/delete.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ template_id: templateId })
        });
        const templateData = await createTemplate.json();
        if (!createTemplate.ok) {
            throw templateData;
        }
        closeTempDeleteDialog();
        location.reload();
    } catch (error) {
        if (error.status === 401) {
            location.href = "login.html";
            localStorage.removeItem("token");
        }
        console.log(error.msg);
    }
}


closeDialogBtns.forEach(btns => btns.addEventListener("click", closeTempDeleteDialog));
confirmBtn.addEventListener("click", deleteUserTemplate);

table.addEventListener("click", (e) => {
    if (e.target.id === "templete-delete-btn") {
        const id = e.target.closest('tr').getAttribute('data-template-id');
        templateId = id;
        openTempDeleteDialog();
    }
});


document.addEventListener("click", (e) => {
    if (e.target.tagName !== "DIALOG") {
        return;
    }

    const rect = e.target.getBoundingClientRect();

    const clickedInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
    );

    if (!clickedInDialog) {
        closeTempDeleteDialog();
    }
});