import {Schema,models,model,Document} from "mongoose";

export interface INotification extends Document {
    user: Schema.Types.ObjectId;
    content: string;
    status: string;
    link:string;
    createdAt: Date
}

const notificationSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    content:{type:String,required:true},
    status:{type:String,enum:["show","unshow"],default:"unshow"},
    link:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

const Notification = models.Notification || model("Notification",notificationSchema);
export default Notification;