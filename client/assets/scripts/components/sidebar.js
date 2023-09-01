$(function () {
    //navbar
    let sidebar = document.createElement('aside');
    sidebar.id = "sidebar"
    sidebar.className = "fixed h-[calc(100vh-48px)] border-r-2 border-black w-[250px]"
    sidebar.innerText = "fixed h-[calc(100vh-48px)] w-[250px]"

    $(sidebar).insertAfter("#navbar");

    $(window).on('load', () => {
        $("#pages").addClass(`w-[calc(100%-${$("#sidebar").outerWidth()}px)] left-[${$("#sidebar").outerWidth()}px]`);
    })
})