const DonationModel = require('../models/Donation_Model')
const { Ok, ServerError, BadRequest, Unauthorised, NotFound, Forbidden } = require('../helper/api-error')

const formatError = (error) => {
    if (!error) return ServerError("Unknown error", error)
    const { statusCode } = error
    switch
    (statusCode) {
        case 400:
            return BadRequest(error)
        case 401:
            return Unauthorised(error)
        case 403:
            return Forbidden(error)
        case 404:
            return NotFound(error)
        default:
            return ServerError(error)
    }
}

const createDonation = async (
    amount,
    fullName,
    address,
    email,
    phone,
    payReferance
) => {
    try {
        const donation = new DonationModel({
            amount: amount,
            full_name: fullName,
            address: address,
            email_address: email,
            other_phone: phone,
            payment_referance: payReferance
        });
        const response = await donation.save();
        if (response) {
            return Ok("Successfully created!!!");
        } else {
            return BadRequest("Request failed");
        }
    } catch (e) {
        return formatError(e)
    }

}

module.exports = {
    createDonation
}