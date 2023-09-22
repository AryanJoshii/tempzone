import { API_URL } from "./require.js";

const userCount = document.getElementById("site-user-count");
const templateCount = document.getElementById("site-template-count");
const categoryCount = document.getElementById("site-category-count");

async function fetchSiteData() {
    try {
        const siteInfoResponse = await fetch(`${API_URL}/admin/siteinfo.php`, {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
        const siteInfoData = await siteInfoResponse.json();
        if (!siteInfoResponse.ok) {
            throw siteInfoData;
        }
        userCount.dataset.siteUserCount = siteInfoData.data.users;
        templateCount.dataset.siteTemplateCount = siteInfoData.data.templates;
        categoryCount.dataset.categoryCount = siteInfoData.data.categories;
        siteUserCount();
        siteTemplateCount();
        siteCategoryCount();
    } catch (error) {
        if (error.status === 401) {
            location.href = "login.html";
            localStorage.removeItem("token");
        }
        console.log(error.msg);
    }
}

function siteUserCount() {
    let startValue = 0;
    let endvalue = userCount.dataset.siteUserCount;
    if (endvalue > 0) {
        let counter = setInterval(() => {
            startValue += 1;
            userCount.innerText = startValue;
            if (startValue == endvalue) {
                clearInterval(counter);
            }
        }, 100);
    }
}

function siteTemplateCount() {
    let startValue = 0;
    let endvalue = templateCount.dataset.siteTemplateCount;
    if (endvalue > 0) {
        let counter = setInterval(() => {
            startValue += 1;
            templateCount.innerText = startValue;
            if (startValue == endvalue) {
                clearInterval(counter);
            }
        }, 100);
    }
}

function siteCategoryCount() {
    let startValue = 0;
    let endvalue = categoryCount.dataset.categoryCount;
    if (endvalue > 0) {
        let counter = setInterval(() => {
            startValue += 1;
            categoryCount.innerText = startValue;
            if (startValue == endvalue) {
                clearInterval(counter);
            }
        }, 100);
    }
}

window.addEventListener("load", () => {
    fetchSiteData();
})