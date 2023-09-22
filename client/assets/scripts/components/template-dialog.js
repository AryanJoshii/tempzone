const templates = [
    {
        name: "resume",
        icon: "assets/icons/resume.svg",
        template_name: "resume",
        template_category: 1
    },
    {
        template_name: "visiting-card",
        name: "visiting card",
        icon: "assets/icons/visiting-card.svg",
        template_category: 2
    },
]

function appendTemplateDialog() {
    let tempDialog = document.createElement("dialog");
    tempDialog.id = "template-dialog";

    tempDialog.append(dialogHeader(), dialogContent())

    document.body.insertAdjacentElement("beforeend", tempDialog);
}

function dialogHeader() {
    let header = document.createElement("header");
    header.className = "dialog-header"

    let title = document.createElement("h1");
    title.className = "dialog-header";
    title.innerText = "Create New Template";

    let closeBtn = document.createElement("button");
    closeBtn.setAttribute("onclick", "closeTempDialog()");
    closeBtn.innerText = "X"

    header.append(title, closeBtn);

    return header;
}

function dialogContent() {
    let container = document.createElement("div");
    container.className = "dialog-content"

    templates.forEach(template => {
        let box = document.createElement("button");
        box.dataset.templateName = template.template_name;
        box.dataset.templateCategory = template.template_category;
        box.setAttribute("onclick", "createNewTemplate(this)");

        let icon = document.createElement("img");
        icon.setAttribute("draggable", false)
        icon.src = template.icon;

        let name = document.createElement("h2");
        name.innerText = template.name

        box.append(icon, name);
        container.append(box)
    })

    return container;
}

function openTempDialog() {
    document.getElementById("template-dialog").showModal();
}

function closeTempDialog() {
    document.getElementById("template-dialog").close();
}

async function createNewTemplate(template) {
    try {
        const createTemplate = await fetch(`http://localhost/tempzone/server/api/template/create.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ template_category: template.dataset.templateCategory })
        });
        const templateData = await createTemplate.json();
        if (!createTemplate.ok) {
            throw templateData;
        }

        window.location.href = `/tempzone/client/editor.html?template-category=${template.dataset.templateName}&template-id=${templateData.data.template_id}`;
    } catch (error) {
        if (error.status === 401) {
            location.href = "login.html";
            localStorage.removeItem("token");
        }
        console.log(error.msg);
    }
}

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
        document.getElementById("template-dialog").close();
    }
})

window.addEventListener("load", () => {
    appendTemplateDialog();
})