
const TempleService = require("../services/templeServices");
console.log("Temple controller")

const addTemple = async (req, res, next) => {
    console.log("addTemple templeControllers11")
    const obj = JSON.parse(req.body.data)
    console.log(obj)
    console.log(req.files)
    try {
        const {
            name,
            templeType,
            templeAdmin,
            mainTemple,
            location,
            mobile_no,
            description
        } = JSON.parse(req.body.data);
        const temp_images = req.files;
        const data = await TempleService.AddTemple(
            name,
            templeType,
            templeAdmin,
            mainTemple,
            location,
            mobile_no,
            description,
            temp_images
        );
        return res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
};

const getTemple = async (req, res, next) => {
    try {
        const response = await TempleService.getAllTemples();
        return res.status(response.status).json(response);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    addTemple,
    getTemple
};