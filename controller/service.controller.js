import Service from "../model/service.model.js";

export const createService = async (req, res) => {
  const data = req.body || {};
  const { name } = data;

  try {
    const service = await Service.findOne({ name });
    if (service) {
      return res.status(409).json({
        status: "error",
        message: "This service already exit!",
        data: service,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const newService = new Service({
      name,
      ...data,
      image: imageUrl,
    });
    await newService.save();
    return res.status(201).json({
      status: "success",
      message: "Service created successfully!",
      data: newService,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const getAllService = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      status: "success",
      message: "Retrieve all services successfully!",
      data: services,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res
        .status(404)
        .json({ status: "error", message: "Service not found!" });
    }

    res.status(200).json({
      status: "success",
      message: "Retrieve a service successfully!",
      data: service,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateService = async (req, res) => {
  const data = req.body || {};
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Service not found!",
        data: service,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        ...data,
        ...(imageUrl && { ...imageUrl }),
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "Service updated successfully!",
      data: updatedService,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        status: "error",
        message: "Service not found!",
        data: service,
      });
    }

    const deletedService = await Service.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Service deleted successfully!",
      data: deletedService,
    });
  } catch (error) {
    console.log("Error", error);
  }
};
