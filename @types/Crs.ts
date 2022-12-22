import { Document, Model } from "mongoose";

export interface ICrs {
   titulo: string;
   nucleo: string;
   descricao: string;
   codigocrs: number;
   responsavel: string;
   date: Date;
   status: boolean;
   observacoes: Array<string>;
}

export interface ICrsDocument extends ICrs, Document {}
export interface ICrsModel extends Model<ICrsDocument> {}
