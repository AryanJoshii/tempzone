export const elementHeight = (el) => {
    const style = getComputedStyle(el);

    return (
        el.getBoundingClientRect().height +
        parseFloat(style.marginTop) +
        parseFloat(style.marginBottom)
    );
}

export const getToken = () => {
    if (typeof window !== undefined) {
        const token = localStorage.getItem("token");
        return token;
    }
}
