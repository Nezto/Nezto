


/**
 * Transforms a user object into a JWT user object.
 *
 * @param {import('./_types').JwtUser} user - The user object to transform.
 * @returns {import('./_types').JwtUser} The transformed JWT user object.
 */
export function jwtUser(user) {
    return {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        picture: user.picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}