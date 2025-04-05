import { Request } from "express";
import { Model } from "mongoose";
import { Document } from "mongoose";

const findDocs = async (req: Request, docModel: Model<Document> | any, selectDoc?: any, populateDoc?: any) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortField = req.query.sortField as string || null;
    try {
        const totalDocs = await docModel.countDocuments({})
        const Docs = await docModel.find().select(selectDoc).sort(sortField).skip(page - 1).limit(limit).populate(populateDoc);
        return { data: Docs, meta: { page, limit, total: totalDocs } }

    } catch (error) {
        return error
    }

}

export { findDocs };