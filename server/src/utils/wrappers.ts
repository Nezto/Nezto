/**Transforms a user object into a JWT user object.*/
export function jwtUser(user : any) : import('./_types').JwtUser {
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