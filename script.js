let actualTheme = "light"
function change() {
    console.log("test")
    if (actualTheme === "light") {
        let elem = document.querySelectorAll(".light");
        for (let i=0; i < elem.length; i++) {
            elem[i].classList.remove("light");
            elem[i].classList.add("dark");
        }
        actualTheme = "dark"
    } else {
        let elem = document.querySelectorAll(".dark");
        for (let i=0; i < elem.length; i++) {
            elem[i].classList.remove("dark");
            elem[i].classList.add("light");
        }
        actualTheme = "light"
    }
}