const DonationService =  require("../services/donationService");

const createDonation = async (req, res, next) => {
    try {
        const { amount, fullName, address, email, phone, referance } = req.body
        const response = await DonationService.createDonation(amount, fullName, address, email, phone, referance);
        return res.status(response.status).json(response);
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createDonation
};