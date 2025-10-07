import Car from "../model/car.model.js";

export const createCar = async (req, res) => {
  const data = req.body || {};
  const { name } = data;

  try {
    const car = await Car.findOne({ name });
    if (car) {
      return res.status(409).json({
        status: "error",
        message: "This car already exit!",
        data: car,
      });
    }
    const imageUrl = req.file ? req.file.path : null;

    const newCar = new Car({
      name,
      ...data,
      image: imageUrl,
    });
    await newCar.save();
    return res.status(201).json({
      status: "success",
      message: "Car created successfully!",
      data: newCar,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const getAllCar = async (req, res) => {
  const { make, model, brand } = req.query;

  const query = {};
  if (make) query.make = make;
  if (model) query.model = model;
  if (brand) query.brand = brand;
  try {
    const cars2 = await Car.find();

    const cars = await Car.find(query);

    const brands = cars2?.map((car) => car?.brand);

    res.status(200).json({
      status: "success",
      message: "Retrieve all cars successfully!",
      data: cars,
      brand: brands,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const findCar = async (req, res) => {
  const data = req.body;
  try {
    const cars = await Car.find(data);

    const brands = cars?.map((car) => car?.brand);

    res.status(200).json({
      status: "success",
      message: "Retrieve all filter cars",
      data: cars,
      brand: brands,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllAggregatedCar = async (req, res) => {
  const { make, model, brand } = req.query;

  const query = {};
  if (make) query.make = make;
  if (model) query.model = model;
  if (brand) query.brand = brand;
  try {
    const cars = await Car.find(query);

    res.status(200).json({
      status: "success",
      message: "Retrieve all cars successfully!",
      data: cars,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return res
        .status(404)
        .json({ status: "error", message: "Car not found!" });
    }

    res.status(200).json({
      status: "success",
      message: "Retrieve a car successfully!",
      data: car,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateCar = async (req, res) => {
  const data = req.body || {};
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({
        status: "error",
        message: "Car not found!",
        data: car,
      });
    }

    const imageUrl = req.file ? req.file.path : null;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      {
        ...data,
        image: imageUrl,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      message: "Car updated successfully!",
      data: updatedCar,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({
        status: "error",
        message: "Car not found!",
        data: car,
      });
    }

    const deletedCar = await Car.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Car deleted successfully!",
      data: deletedCar,
    });
  } catch (error) {
    console.log("Error", error);
  }
};
