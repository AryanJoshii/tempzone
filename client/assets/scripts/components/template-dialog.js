const templates = [
    {
        name: "resume",
        icon: "assets/icons/resume.svg",
        template_name: "resume",
    },
    {
        template_name: "visiting-card",
        name: "visiting card",
        icon: "assets/icons/visiting-card.svg"
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

function createNewTemplate(template) {
    window.location.href = "/client/editor.html?template-name=" + template.dataset.templateName;
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