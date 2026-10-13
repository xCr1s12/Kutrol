import { postUpload, deleteUpload } from "@/controllers/upload.controller";

export const runtime = "nodejs"; 

export const POST = postUpload;
export const DELETE = deleteUpload;