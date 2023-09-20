import { API_URL } from "../require.js";

const container = document.getElementById("user-template-grid");
const countDiv = document.getElementById("user-temp-count");

const dateOptions = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", dayperiod: "short" }


async function fetchTemplates() {
    try {
        const templateResponse = await fetch(`${API_URL}/template/fetchusertemp.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        const templateList = await templateResponse.json();
        countDiv.dataset.templateCount = templateList.data.length;
        appendTemplates(templateList.data);
        userTemplateCount();
    } catch (error) {
        console.log(error);
    }
}

function appendTemplates(templates) {
    templates.forEach(template => {
        let templateBox = document.createElement('a');
        templateBox.href = `/tempzone/client/editor.html?template-category=${template.template_category}&template-id=${template.template_id}`

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

function userTemplateCount() {
    let startValue = 0;
    let endvalue = countDiv.dataset.templateCount;
    if (endvalue > 0) {
        let counter = setInterval(() => {
            startValue += 1;
            countDiv.innerText = startValue;
            if (startValue == endvalue) {
                clearInterval(counter);
            }
        }, 100);
    }
}

window.addEventListener("load", () => {
    fetchTemplates();
})