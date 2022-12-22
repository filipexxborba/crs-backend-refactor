import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { CrsModel } from "../models/Crs";
import { ICrsDocument } from "../@types/Crs";
const router = express.Router();

router.get("/crsaberta", (_: Request, res: Response) => {
   CrsModel.find({ status: false }, (error, crs: ICrsDocument) => {
      if (error) res.status(500).send({ message: error.message });
      res.status(200).send(crs);
   });
});

router.get("/crsresolvida", (_, res: Response) => {
   CrsModel.find({ status: true }, (error, crs: ICrsDocument) => {
      if (error) res.status(500).send({ message: error.message });
      res.status(200).send(crs);
   });
});

router.get("/getcrs/:id", (req: Request, res: Response) => {
   CrsModel.findById(req.params.id, (error: Error, crs: ICrsDocument) => {
      if (error) res.status(500).send({ message: error.message });
      if (crs) res.status(200).json(crs);
      else
         res.status(404).send({
            message: `Não foi encontrada nenhuma CRS com essa ID: ${req.params.id}`,
         });
   });
});

router.post(
   "/createcrs/:titulo&:descricao&:responsavel&:codigocrs&:nucleo",
   (req: Request, res: Response) => {
      const { titulo, descricao, responsavel, codigocrs, nucleo } = req.params;
      const id = new mongoose.Types.ObjectId();
      const data = {
         _id: id,
         titulo: titulo,
         descricao: descricao,
         responsavel: responsavel,
         codigocrs: codigocrs,
         nucleo: nucleo,
         status: false,
         date: new Date(),
      };
      const newCrs = new CrsModel(data);
      newCrs
         .save()
         .then((crs) => {
            res.status(201).send(crs);
         })
         .catch((error: Error) =>
            res.status(500).send({ message: error.message })
         );
   }
);

router.put("/updatecrs/:id", (req: Request, res: Response) => {
   CrsModel.findById(req.params.id, (error: Error, crs: ICrsDocument) => {
      if (error) res.status(500).send({ message: error.message });
      if (crs) {
         crs.status = true;
         crs.save()
            .then((crs) => res.status(200).send(crs))
            .catch((error: Error) =>
               res.status(500).send({ message: error.message })
            );
      } else
         res.status(400).send({
            message: `Não foi possível dar update na CRS: ${req.params.id}, não foi encontrada.`,
         });
   });
});

router.put("/updateobs/:id&:observacao", (req: Request, res: Response) => {
   const { id, observacao } = req.params;
   CrsModel.findById(id, (error: Error, crs: ICrsDocument) => {
      if (error) res.status(500).send({ message: error.message });
      if (crs) {
         const newObs = `${new Date().toLocaleDateString(
            "pt-br"
         )} - ${observacao}`;
         crs.observacoes.push(newObs);
         crs.save()
            .then((crs) => res.status(200).send(crs))
            .catch((error: Error) =>
               res.status(500).send({ message: error.message })
            );
      } else
         res.status(500).send({
            message: `Não foi possível dar update na CRS: ${id}, não foi encontrada.`,
         });
   });
});

router.put(
   "/updateinfocrs/:id&:titulo&:descricao&:responsavel&:codigocrs&:nucleo&:date",
   (req: Request, res: Response) => {
      const { id, titulo, descricao, responsavel, codigocrs, nucleo, date } =
         req.params;
      CrsModel.findById(id, (error: Error, crs: ICrsDocument) => {
         if (error) res.status(500).send({ message: error.message });
         if (crs) {
            crs.titulo = titulo;
            crs.descricao = descricao;
            crs.responsavel = responsavel;
            crs.codigocrs = parseInt(codigocrs);
            crs.nucleo = nucleo;
            crs.date = new Date(date);
            crs.save()
               .then((crs) => res.status(200).send(crs))
               .catch((error: Error) =>
                  res.status(500).send({ message: error.message })
               );
         } else
            res.send({
               message: `Não foi possível dar update na CRS: ${id}, não foi encontrada.`,
            });
      });
   }
);

router.delete("/deletecrs/:id", (req: Request, res: Response) => {
   CrsModel.findByIdAndDelete(
      req.params.id,
      (error: Error, _: ICrsDocument) => {
         if (error) res.status(500).send({ message: error.message });
         res.status(200).send({
            message: `CRS com a ID: ${req.params.id} foi excluída!`,
         });
      }
   );
});

export default router;
