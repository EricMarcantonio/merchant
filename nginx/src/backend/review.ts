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

export const GetUsername = (id: number) => {
	return a.request({
		method: 'get',
		url: `/auth/v1/user/${id}/`,
		headers: {
			'Cookie': 'auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwMjkyNTMwLCJleHAiOjE3MzY2OTI1MzB9.CuyJil_t-gun2IcjmNOxQJ-7GZDQeeYx4iulJtvnHbY'
		}
	}).then((data) =>{
		return data.data;
	})
};