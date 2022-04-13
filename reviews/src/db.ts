import {IReview} from "./types";
import {ReviewsModel} from "./util/models";


export const Review = {
    getById: (id: number) => {
        return ReviewsModel.findAll({
            where: {
                itemId: id
            }
        })
    },
    create: (review: IReview) => {
        return ReviewsModel.create(review)
    }
}

