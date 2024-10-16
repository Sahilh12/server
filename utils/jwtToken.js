module.exports.jwtToken = async (user, message, statusCode, res) => {
    const token = await user.generateJsonWebToken()

    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,      // Ensures the cookie is sent in HTTP requests only (not available to JS)
            secure: true,        // Cookie will only be sent over HTTPS
            sameSite: "None",    // Allows cross-site cookie
        })
        .json({
            success: true,
            token,
            message,
            user,
        });

}