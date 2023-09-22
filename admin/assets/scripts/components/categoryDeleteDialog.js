import { API_URL } from "../require.js";

let categoryId = null;

const table = document.getElementById("category-table");
const closeDialogBtns = document.querySelectorAll(".close-dialog-btn");
const confirmBtn = document.getElementById("confirm-delete-category");
const categoryDeleteDialog = document.getElementById("category-delete-dialog");

function openCategoryDeleteDialog() {
    categoryDeleteDialog.showModal();
}

function closeCategoryDeleteDialog() {
    categoryDeleteDialog.close();
    categoryId = null;
}

async function deleteCategory() {
    try {
        const deleteCategoryResponse = await fetch(`${API_URL}/admin/category/delete.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ category_id: categoryId })
        });
        const deleteCategoryData = await deleteCategoryResponse.json();
        if (!deleteCategoryResponse.ok) {
            throw deleteCategoryData;
        }
        closeCategoryDeleteDialog();
        location.reload();
    } catch (error) {
        if (error.status === 401) {
            location.href = "login.html";
            localStorage.removeItem("token");
        }
        console.log(error.msg);
    }
}


closeDialogBtns.forEach(btns => btns.addEventListener("click", closeCategoryDeleteDialog));
confirmBtn.addEventListener("click", deleteCategory);

table.addEventListener("click", (e) => {
    if (e.target.id === "category-delete-btn") {
        const id = e.target.closest('tr').getAttribute('data-category-id');
        categoryId = id;
        openCategoryDeleteDialog();
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
        closeCategoryDeleteDialog();
    }
});