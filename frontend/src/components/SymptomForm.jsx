import React from 'react'
import { useForm } from 'react-hook-form'


export default function SymptomForm({ onSubmit, isSubmitting = false }) {
	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		defaultValues: { age: '', weight: '', symptoms: '', days: 1, context: '' },
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl bg-[#f4fff9] border border-[#cfe9d8] p-6 shadow-[0_15px_35px_rgba(15,36,24,0.08)]">
			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-2">
					<label className="block text-sm font-semibold text-[#274534]">Age</label>
					<input
						type="number"
						{...register('age', { valueAsNumber: true, required: true, min: 0 })}
						className="block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-2.5 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
						disabled={isSubmitting}
					/>
					{errors.age && <p className="text-sm text-red-500">Provide a valid age</p>}
				</div>
				<div className="space-y-2">
					<label className="block text-sm font-semibold text-[#274534]">Weight (kg)</label>
					<input
						type="number"
						{...register('weight', { valueAsNumber: true, required: true, min: 0 })}
						className="block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-2.5 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
						disabled={isSubmitting}
					/>
					{errors.weight && <p className="text-sm text-red-500">Provide a valid weight</p>}
				</div>
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-semibold text-[#274534]">Describe symptoms</label>
				<textarea
					{...register('symptoms', { required: true })}
					placeholder="e.g., fever, sore throat, headache"
					rows={3}
					className="block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-2.5 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
					disabled={isSubmitting}
				/>
				{errors.symptoms && <p className="text-sm text-red-500">This field is required</p>}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-semibold text-[#274534]">Duration (days)</label>
				<input
					type="number"
					{...register('days', { valueAsNumber: true, required: true, min: 0 })}
					className="w-40 rounded-2xl border border-[#d5ecdf] bg-white px-4 py-2.5 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
					disabled={isSubmitting}
				/>
				{errors.days && <p className="text-sm text-red-500">Enter a valid duration</p>}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-semibold text-[#274534]">Additional context (optional)</label>
				<textarea
					{...register('context')}
					rows={2}
					placeholder="Medications taken, medical history, etc."
					className="block w-full rounded-2xl border border-[#d5ecdf] bg-white px-4 py-2.5 text-sm text-[#0f2418] focus:border-[#00ed64] focus:ring-2 focus:ring-[#00ed64]/30"
					disabled={isSubmitting}
				/>
			</div>

			<div className="flex flex-wrap gap-3">
				<button
					type="submit"
					className="px-5 py-2.5 rounded-2xl bg-[#00ed64] text-[#062615] text-sm font-semibold shadow-md shadow-[#00ed64]/25 hover:bg-[#1bff7a] transition disabled:opacity-60"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : 'Get suggestions'}
				</button>
				<button
					type="button"
					onClick={() => reset()}
					className="px-5 py-2.5 rounded-2xl border border-[#cfe9d8] text-[#274534] bg-white/80 hover:bg-white transition"
					disabled={isSubmitting}
				>
					Reset
				</button>
			</div>
		</form>
	)
}