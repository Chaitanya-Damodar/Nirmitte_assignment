import Patient from "../model/patientSchema.js";

const getAllPatient = async (req, res) => {
  const pat = await Patient.find();
  res.send(pat);
};

const getSinglePatient = async (req, res) => {
  const singlePat = await Patient.findOne({ Name });
  res.send(singlePat);
};

const postSinglePatient = async (req, res) => {
  const {
    Name,
    age,
    gender,
    address,
    contactNo,
    remainingBill
  } = req.body;

  const patExist = await Patient.findOne({ Name });

  if (patExist) {
    res.status(400);
    throw new Error("Patient already exist");
  }

  const pat = await Patient.create({
    Name,
    age,
    gender,
    address,
    contactNo,
    remainingBill
  });

  if (pat) {
    res.status(201).json({
      _id: Patient._id,
      Name: Patient.Name,
      age: Patient.age,
      gender: Patient.gender,
      address:Patient.address,
      contactNo:Patient.contactNo,
      remainingBill:Patient.remainingBill
    });
  } else {
    res.status(400);
    throw new Error("Invalid Patient data");
  }
};


const deletePatient=async(req,res)=>{
    const pat= await Patient.findById(req.params.id);
    if(pat){
        await doc.deleteOne({_id:Patient.id});
        res.status(200).json({message:"Patient deleted Successfully"})

    }else{
        res.status(404).json({message:"Patient not found"})
    }
}

export {getAllPatient,getSinglePatient,postSinglePatient,deletePatient}
