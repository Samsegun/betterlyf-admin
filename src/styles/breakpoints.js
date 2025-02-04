// breakpoints.js
const sizes = {
    mobile: "320px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px",
};

export const breakpoints = {
    mobile: `@media screen and (min-width: ${sizes.mobile})`,
    tablet: `@media screen and (min-width: ${sizes.tablet})`,
    laptop: `@media screen and (min-width: ${sizes.laptop})`,
    desktop: `@media screen and (min-width: ${sizes.desktop})`,
};
