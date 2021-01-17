import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
const PeoplesSchema = new Schema({
    adult: { type: Boolean },
    gender:{type:Number},
    id: { type: Number, required: true, unique: true },
    known_for_department: { type: String },
    name: { type: String },
    popularity:{type:Number},
    profile_path: { type: String },
});

PeoplesSchema.statics.findByPeoplesDBId = function (id) {
    return this.findOne({ id: id });
  };
  
  export default mongoose.model('Peoples', PeoplesSchema);
