import { API_URL } from "../require.js";

const container = document.getElementById("user-template-grid");
const countDiv = document.getElementById("user-temp-count");

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

        templateBox.append(heading, subHeading, category);

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