import { toast } from "react-toastify";

export const toastError = (text: string) => {
	toast.error(text);
};
