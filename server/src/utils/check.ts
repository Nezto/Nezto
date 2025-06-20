

/**Return true if all the conditions are true, no condition : `true` */
function all(conditions: boolean[]): boolean {
    for (const condition of conditions) {
        if (!condition) {
            return false;
        }
    }
    return true;
}

/**Return true if any single condition is true, no condition : `true` */
function one(conditions: boolean[]): boolean {
    for (const condition of conditions) {
        if (condition) {
            return true;
        }
    }
    return false;
}


export { all, one };