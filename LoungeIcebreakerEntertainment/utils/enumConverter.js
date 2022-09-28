/**
 * 
 * @param {string} item - A string from an enum in the form of STRING
 * @returns {string} - Turns STRING into String, EXAMPLE -> Example.
 */

export const enumConverter = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
}