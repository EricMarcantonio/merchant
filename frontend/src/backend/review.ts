import { IReview } from "../components/ProductList";
import { a } from "./types";


export const GetReviewsByItemId = (id: number) => {

	return a.request<IReview[]>({
		method: "get",
		url: `/reviews/${id}/`,
	})
		.then((response) => {
			console.log(response.data);
			return response.data;
		});
};

export const AddReview = (itemId: string, reviewData: string, rating: string) => {
	var data = JSON.stringify({
		"itemId": itemId,
		"data": reviewData,
		"rating": rating,
	});


	return a.request({
		method: "post",
		url: "/reviews/",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	})
		.then(function(response) {
			console.log(JSON.stringify(response.data));

			return GetReviewsByItemId(response.data.itemId).then((reviews) => {
				return reviews;
			});
		});
};