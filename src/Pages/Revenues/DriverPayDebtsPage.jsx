import React from "react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import moment from "moment";

import { useDriverPayDebtsMutation } from "../../Mutations/RevenuesMutations";

import { useDriverTotalDebtsQuery } from "../../Queries/RevenuesQueries";

import { useDriverInfosQuery } from "../../Queries/DriversQueries";

import { ConfirmAlert } from "../../Components/Alerts";

import { DataLoader } from "../../Components/Loaders";

import { FetchErrorAlert } from "../../Components/Alerts";

import { formatFullName, formatPrice, modalAction, toast } from "../../ComponentsUtilities/ComponentsUtilities";

const Stat = ({ title, stat }) => {

	return (

		<div className="stats shadow">

			<div className="stat">

				<div className="stat-title">{ title }</div>

				<div className="stat-value text-red-500">{ stat }</div>

			</div>

		</div>
	)
}

const DriverPayDebtsPage = () => {

	const navigate = useNavigate();

	const { driverId } = useParams();

	const [ searchParams ] = useSearchParams();

	const [ inputs, setInputs ] = React.useState({

		startDate : moment(searchParams.get('startDate')).format('YYYY-MM-DD'),
		endDate : moment(searchParams.get('endDate')).format('YYYY-MM-DD'),
	});

	const handleDateChange = (e) => {

		setInputs(prevInputs => ({

			...prevInputs,
			[e.target.name] : e.target.value
		}))
	}

	const {
		
		data : total,
		isLoading : isLoadingTotalDebts,
		isError : isTotalDebtsError,
		refetch : refetchTotalDebts
	} = useDriverTotalDebtsQuery({

		driverId,
		startDate : inputs.startDate,
		endDate : inputs.endDate
	});

	const {
		
		data : driver,
		isLoading : isLoadingDriver,
		isError : isDriverError,
		refetch : refetchDriverInfos
	} = useDriverInfosQuery({

		driverId
	});

	const { mutate, isLoading : isPaying } = useDriverPayDebtsMutation();

	const refetchAll = () => {

		refetchTotalDebts();

		refetchDriverInfos();
	}

	const submit = () => {

		if (isPaying) {

			return;
		}

		mutate({

			driverId,
			startDate : moment(inputs.startDate).toISOString(),
			endDate : moment(inputs.endDate).toISOString()
		}, {

			onSuccess () {

				navigate(-1)
			},

			onError () {

				toast({ message : 'une erreur s\'est produite.' });
			}
		})
	}

	return (

		<div id="driver-pay-debts-page">

			<div className="container mx-auto px-4">

				{ (isLoadingTotalDebts || isLoadingDriver) && <DataLoader/> }

				{ !(isLoadingTotalDebts || isLoadingDriver) && (isTotalDebtsError || isDriverError) && <FetchErrorAlert tryAgain={refetchAll}/> }

				{ !(isLoadingTotalDebts || isLoadingDriver) && !(isTotalDebtsError || isDriverError) && (

					<div>

						<h1 className="mb-4 font-bold first-letter:uppercase">
						
							recouvrer les dettes du chauffeur : <span className="text-primary">{ formatFullName(driver.firstName, driver.lastName) }</span>
						
						</h1>

						<div className="space-y-4">

							<Stat title="Total des dettes" stat={formatPrice(total)}/>

							<div className="grid grid-cols-2 gap-4">

								<div>

									<input

										type="date"
										name="startDate"
										className="input w-full input-bordered"
										value={inputs.startDate}
										onChange={handleDateChange}
									/>

								</div>

								<div>

									<input

										type="date"
										name="endDate"
										className="input w-full input-bordered"
										value={inputs.endDate}
										onChange={handleDateChange}
									/>

								</div>

							</div>

							<div className="text-right">

								<button type="button" onClick={() => modalAction('confirm-alert', 'open')} className="btn btn-primary">règlez les dettes</button>

							</div>

						</div>

						<ConfirmAlert

							title="régler les dettes"
							text="êtes-vous sûr de vouloir effectuer ce règlement de dettes ?"
							onConfirm={submit}
						/>

					</div>

				) }

			</div>

		</div>
	)
}

export default DriverPayDebtsPage;