
export default function getLocalTheme() {
    const localTheme = localStorage.getItem('theme')
    //   console.log('=>localTheme', localTheme)
    if (!localTheme || JSON.parse(localTheme) === 'system') {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
        // console.log('=>darkThemeMq', darkThemeMq)
        if (darkThemeMq.matches) {
            return 'dark'
        } else {
            return 'light'
        }
    }
    return JSON.parse(localTheme)
}