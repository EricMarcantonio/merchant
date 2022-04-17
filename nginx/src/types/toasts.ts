import { toast } from "react-toastify";

interface IToast {
	run: (timout?: number) => void;
}

export class ErrorToast implements IToast {
	private msg: string;

	constructor(msg: string) {
		this.msg = msg;
	}

	public run(timout?: number) {
		return new Promise<void>((res, rej) => {
			toast.error(this.msg, {
				onClose: () => res(),
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: "dark",
				autoClose: timout || 1000,
			});
		});
	}
}

export class SuccessToast implements IToast {
	private msg: string;

	constructor(msg: string) {
		this.msg = msg;
	}

	public run(timeout?: number) {
		return new Promise<void>((res, rej) => {
			toast.success(this.msg, {
				onClose: () => res(),
				position: toast.POSITION.BOTTOM_RIGHT,
				theme: "dark",
				autoClose: timeout || 1000,
			});
		});
	}
}

export class ToastFactory {
	createToast(type: "ERROR" | "SUCCESS", msg: string) {
		switch (type) {
			case "ERROR": {
				return new ErrorToast(msg);
			}
			case "SUCCESS": {
				return new SuccessToast(msg);
			}
		}
	}
}
