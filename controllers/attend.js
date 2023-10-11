import Attendence from "../models/Attendence.js";
import User from "../models/User.js";

export const attend = async (req, res) => {
    try {
        console.log('hello');
      const { participant } = req.body;
      console.log(participant);
      const user = await User.findOne({ username: participant });
      if (!user){
        return res.status(400).json({ msg: "User does not exist. " });
      } 
      const isMatch = (participant == user.username)? true : false;
      // check already attended
      const attende = await Attendence.findOne({ participant: participant });
      if (!attende){
        // return res.status(400).json({ msg: "User does not exist. " });
        if (isMatch){
          try{
              const addParticipant = new Attendence(req.body);
  
              const saveParticipant = await addParticipant.save();
              res.status(200).send(saveParticipant);
          }catch(err){
              res.status(400).send(err);
          }
          return res.status(200).send("Allow Participant");
        } 
      }
      else{
          try{
            const getAttende = Attendence.findOneAndReplace({ participant: participant }, { participant: participant });   
            res.status(200).send(getAttende);
          }catch(err){
              res.status(400).send(err);
          }
          
      } 
      // if (isMatch){
      //   try{
      //       const addParticipant = new Attendence(req.body);

      //       const saveParticipant = await addParticipant.save();
      //       res.status(200).send(saveParticipant);
      //   }catch(err){
      //       res.status(400).send(err);
      //   }
      //   return res.status(200).send("Allow Participant");
      // } 
  
        // return res.status(200).send("Dont Allow participant.");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
// export const attend = async (req, res) => {
//     // try {
//         console.log('hello');
//       const { participant } = req.body;
//       console.log(participant);
//       const user = await User.findOne({ username: participant });
//       if (!user){
//         return res.status(400).json({ msg: "User does not exist. " });
//       } 
      
//       const isMatch = (participant == user.username)? true : false;
//       if (isMatch){
//         // try{
//             const addParticipant = new Attendence(req.body);

//             const saveParticipant = await addParticipant.save();
//             res.status(200).send(saveParticipant);
//         // }catch(err){
//             // res.status(400).send(err);
//         // }
//         return res.status(200).send("Allow Participant");
//       } 
  
//         return res.status(200).send("Dont Allow participant.");
//     // } catch (err) {
//     //   res.status(500).json({ error: err.message });
//     // }
// };
