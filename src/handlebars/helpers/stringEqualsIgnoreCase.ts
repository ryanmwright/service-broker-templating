export default (str1, str2) => {
    return str1 != null 
        && typeof str1 === 'string'
        && str2.toUpperCase() === str1.toUpperCase();
};