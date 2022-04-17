import { a, UserAttributes } from "./types";

export const VerifyUser = () => {
	let data = "";
	return a.request<UserAttributes>({
		method: "post",
		url: "/auth/v1/verify/",
		headers: {},
		data: data,
		withCredentials: true,
	})
		.then((response) => {
			return response.data;
		});
};