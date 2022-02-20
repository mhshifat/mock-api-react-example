import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

const GET_PRICE_RULES = ({ queryKey }) => {
	const [, args] = queryKey;
	return fetch("/price-rules").then((res) => res.json());
};
export default function Home() {
	const { register } = useForm({
		defaultValues: {
			weight: "",
			address: "isd",
			price: "",
		},
	});
	const {
		data: priceRulesData,
		isLoading,
		isError,
		error,
	} = useQuery(["GET_PRICE_RULES", {}], GET_PRICE_RULES);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error: {error.message}</p>;
	return (
		<div className="container mx-auto my-12">
			<div className="w-[500px] bg-slate-200 rounded mx-auto p-5 shadow-md">
				<h3 className="text-lg font-semibold text-sky-900">
					Place Your Order (Parcel)
				</h3>
				<p className="text-sm text-gray-500">
					Please fill out the form below to place your order!
				</p>
				<div className="flex-grow border-t border-gray-400 mt-3 mb-5 opacity-60" />

				<form
					onSubmit={(e) => {
						e.preventDefault();
						console.log("Form Submitted");
					}}
					className="w-full"
				>
					<label className="block mb-4">
						<span className="text-sm font-semibold block">Weight</span>
						<input
							type="text"
							className="w-full mt-1 h-8 rounded px-4 border border-transparent focus:border-sky-900 focus:outline-none"
							{...register("weight")}
						/>
					</label>

					<label className="block mb-4">
						<span className="text-sm font-semibold block">
							Address to deliver
						</span>
						<select
							className="w-full mt-1 h-8 rounded px-4 border border-transparent focus:border-sky-900 focus:outline-none"
							{...register("address")}
						>
							<option value="isd">ISD (Inside Dhaka)</option>
							<option value="osd">OSD (Outside Dhaka)</option>
						</select>
					</label>

					<label className="block mb-4">
						<span className="text-sm font-semibold block">Price Rule</span>
						<select
							className="w-full mt-1 h-8 rounded px-4 border border-transparent focus:border-sky-900 focus:outline-none"
							{...register("price")}
						>
							<option value="">Select Price Rule</option>
							{priceRulesData?.map((rule, ruleIdx) => (
								<option key={ruleIdx} value={rule.weight}>
									BDT {rule.price}
								</option>
							))}
						</select>
					</label>

					<button
						className="bg-sky-900 text-slate-200 px-4 py-2 rounded mt-5"
						type="submit"
					>
						Place Order
					</button>
				</form>
			</div>
		</div>
	);
}
