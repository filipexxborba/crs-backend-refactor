import mongoose, { model } from "mongoose";
import { ICrsDocument } from "../@types/Crs";

const crsSchema = new mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   titulo: String,
   nucleo: String,
   descricao: String,
   codigocrs: Number,
   responsavel: String,
   date: Date,
   status: Boolean,
   observacoes: Array,
});

export const CrsModel = model<ICrsDocument>("crs", crsSchema);
