import {db, MVisitingEvent, VisitEventModel} from "./util";
import { VisitingEventInput} from "./util/types";

export const VisitingService = {
    getAll: async () => {
        let date = new Date();
        return await VisitEventModel.findAll({
            where: db.where(db.fn('date', db.col('createdAt')), '>', new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000)))
        }) as Array<MVisitingEvent>
    },
    Set: async (visiting_event: VisitingEventInput) => {
        return await VisitEventModel.create(visiting_event) as MVisitingEvent
    }
}