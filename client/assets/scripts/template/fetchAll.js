import { API_URL } from "../require.js";

const dateOptions = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", dayperiod: "short" }

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
        let templateBox = document.createElement('a');
        templateBox.href = `/tempzone/client/template-view.html?template-category=${template.template_category}&template-id=${template.template_id}`

        let heading = document.createElement('h5');
        let subHeading = document.createElement('h6');
        let category = document.createElement('p');

        heading.innerText = template.template_name;
        subHeading.innerText = template.template_owner;
        category.innerText = template.template_category;

        let footer = document.createElement('footer');

        let createdAtDiv = document.createElement('div');
        let createdIcon = document.createElement('img');
        createdIcon.src = "assets/icons/add.svg";
        let createdDate = document.createElement('p');
        createdDate.innerText = new Date(template.created_at).toLocaleString("en-IN", dateOptions);
        createdAtDiv.append(createdIcon, createdDate);
        
        let updatedAtDiv = document.createElement('div');
        let updatedIcon = document.createElement('img');
        updatedIcon.src = "assets/icons/update.svg";
        let updatedDate = document.createElement('p');
        updatedDate.innerText = new Date(template.updated_at).toLocaleString("en-IN", dateOptions);
        updatedAtDiv.append(updatedIcon, updatedDate);

        footer.append(createdAtDiv, updatedAtDiv)

        templateBox.append(heading, subHeading, category, footer);

        container.append(templateBox);
    })
}

window.addEventListener("load", () => {
    fetchTemplates();
})