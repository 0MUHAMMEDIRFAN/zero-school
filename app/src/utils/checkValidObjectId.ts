import { isValidObjectId } from 'mongoose';

export const checkValidObjectId = (id: any): any => {
    return id && isValidObjectId(id.toString()) ? id : null
}