"use server";
import Notification from "@/database/notification.modal";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";

export async function getNotifications(userId:string){
    try {
        connectToDatabase();

        const notifications = await Notification.find({user:userId}).sort({ createdAt: -1 });
        return notifications;
    } catch (error) {
        console.log(error);
    }
}

export async function updateNotification(notificationId:string,path:string){
    try {
        connectToDatabase();
        const notification = await Notification.findById(notificationId);
        notification.status = "show";
        await notification.save();
        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}