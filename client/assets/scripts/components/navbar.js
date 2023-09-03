$(function () {
    //navbar
    let nav = document.createElement('header');
    nav.id = "navbar"
    nav.className = "flex justify-between items-center top-0 sticky bg-white px-3 py-3 z-50 border-b-2 border-black"

    //logo
    let logo = document.createElement('h1');
    logo.innerText = "TempZone";
    logo.className = "text-2xl font-semibold";

    //profile and dark mode div
    let rightDiv = document.createElement('div');
    rightDiv.className = "flex items-center gap-5";

    //toggle light-dark mode button
    let toggleBtn = document.createElement('button');
    toggleBtn.id = "sidebarToogle"
    toggleBtn.innerText = "Light"

    //profile
    let profile = document.createElement('div');
    profile.className = "rounded-full w-8 h-8 bg-black";

    rightDiv.append(toggleBtn, profile)
    nav.append(logo, rightDiv);

    $(document.body).prepend(nav);

    $("#sidebarToogle").on("click", () => {
        $("#sidebar").animate({
            width: '100px',
        })
        $("#pages").animate().addClass("left-[100px] w-[calc(100%-100px)]")
    })

    $(window).on('load', () => {
        $("#pages").addClass(`h-[calc(100vh-${$("#navbar").outerHeight()}px)]`);
    })
})