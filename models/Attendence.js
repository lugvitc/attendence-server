import mongoose from "mongoose";

const AttendenceSchema = new mongoose.Schema(
  {
    participant: {
      type: String,
      required: true,
      unique:true,
      min: 2,
      
    },
  },
  { timestamps: true }
);

const Attendence = mongoose.model("Attendence", AttendenceSchema);
export default Attendence;