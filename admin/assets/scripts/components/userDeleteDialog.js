import { API_URL } from "../require.js";

let userId = null;

const table = document.getElementById("user-table");
const closeDialogBtns = document.querySelectorAll(".close-dialog-btn");
const confirmBtn = document.getElementById("confirm-delete-user");
const userDeleteDialog = document.getElementById("user-delete-dialog");

function openUserDeleteDialog() {
    userDeleteDialog.showModal();
}

function closeUserDeleteDialog() {
    userDeleteDialog.close();
    userId = null;
}

async function deleteUser() {
    try {
        const deleteUserResponse = await fetch(`${API_URL}/admin/user/delete.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ user_id: userId })
        });
        const deleteUserData = await deleteUserResponse.json();
        closeUserDeleteDialog();
        location.reload();
    } catch (error) {
        console.log(error);
    }
}


closeDialogBtns.forEach(btns => btns.addEventListener("click", closeUserDeleteDialog));
confirmBtn.addEventListener("click", deleteUser);

table.addEventListener("click", (e) => {
    if (e.target.id === "user-delete-btn") {
        const id = e.target.closest('tr').getAttribute('data-user-id');
        userId = id;
        openUserDeleteDialog();
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
        closeUserDeleteDialog();
    }
});