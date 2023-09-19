import { API_URL } from "../require.js";

function generateTemplate() {
    let url = new URL(window.location.href);
    const templateContainer = document.getElementById("drop-container");

    templateContainer.dataset.templateCategory = url.searchParams.get("template-category");
}

async function saveTemplate() {
    let url = new URL(window.location.href);
    const templateChildren = document.getElementById('drop-container').children;
    const childrenString = Array.from(templateChildren).map(element => element.outerHTML).join('');

    let data = {
        template_data: {
            template_name: document.getElementById('template-name').value,
            template_tags: JSON.stringify(childrenString),
            template_id: url.searchParams.get('template-id')
        }
    }

    try {
        const templateResponse = await fetch(`${API_URL}/template/update.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        });
        const templateData = await templateResponse.json();
    } catch (error) {
        console.log(error);
    }

}

async function fetchTemplate() {
    try {
        let url = new URL(window.location.href);
        const templateFetchResponse = await fetch(`${API_URL}/template/fetch.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ template_id: url.searchParams.get("template-id") })
        });
        const templateFetchData = await templateFetchResponse.json();
        console.log(templateFetchData.data.template_tags);
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('template-save-btn').addEventListener('click', saveTemplate)

window.addEventListener("load", () => {
    generateTemplate();
    fetchTemplate();
})