import Doctor from "../model/doctorSchema.js";

const getAllDoctor = async (req, res) => {
  const doc = await Doctor.find();
  res.send(doc);
};

const getSingleDoctor = async (req, res) => {
  const singleDoc = await Doctor.findOne({ Name });
  res.send(singleDoc);
};

const postSingleDoctor = async (req, res) => {
  const {
    Name,
    age,
    gender,
    speciality,
    address,
    contactNo,
    fees
  } = req.body;

  const docExist = await Doctor.findOne({ Name });

  if (docExist) {
    res.status(400);
    throw new Error("Doctor already exist");
  }

  const doct = await Doctor.create({
    Name,
    age,
    gender,
    speciality,
    address,
    contactNo,
    fees
  });

  if (doct) {
    res.status(201).json({
      _id: Doctor._id,
      Name: Doctor.Name,
      age: Doctor.age,
      gender: Doctor.gender,
      speciality:Doctor.speciality,
      address:Doctor.address,
      contactNo:Doctor.contactNo,
      fees:Doctor.fees
    });
  } else {
    res.status(400);
    throw new Error("Invalid doctor data");
  }
};


const deleteDoctor=async(req,res)=>{
    const doc= await Doctor.findById(req.params.id);
    if(doc){
        await doc.deleteOne({_id:Doctor.id});
        res.status(200).json({message:"Doctor deleted Successfully"})

    }else{
        res.status(404).json({message:"Doctor not found"})
    }
}

export {getAllDoctor,getSingleDoctor,postSingleDoctor,deleteDoctor}
