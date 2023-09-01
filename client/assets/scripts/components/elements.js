$(function () {
    let url = new URL(window.location.href);
    console.log(url.searchParams.get("id"));
});