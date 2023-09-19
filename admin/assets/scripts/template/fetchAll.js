import { API_URL } from "../require.js";

const container = document.getElementById("explore-grid");

async function fetchTemplates() {
    try {
        const templateResponse = await fetch(`${API_URL}/template/fetchAll.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        const templateList = await templateResponse.json();
        appendTemplates(templateList.data);
    } catch (error) {
        console.log(error);
    }
}

function appendTemplates(templates) {
    templates.forEach(template => {
        let templateBox = document.createElement('div');

        let heading = document.createElement('h5');
        let subHeading = document.createElement('h6');
        let category = document.createElement('p');

        heading.innerText = template.template_name;
        subHeading.innerText = template.template_owner;
        category.innerText = template.template_category;

        templateBox.append(heading, subHeading, category);

        container.append(templateBox);
    })
}

window.addEventListener("load", () => {
    fetchTemplates();
})