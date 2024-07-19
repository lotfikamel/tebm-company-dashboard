import { useQueryClient } from "react-query";

import { Link } from "react-router-dom";

import { Edit, MoreVertical, Trash2, Lock, Unlock, ExternalLink } from "react-feather";

import { useBlockDriverMutation, useDetachEngineMutation, useUnblockDriverMutation } from "../../Mutations/DriversMutations";

import usePermissions from "../../Hooks/usePermissions";

import { ConfirmAlert } from "../../Components/Alerts";

import { modalAction, toast } from "../../ComponentsUtilities/ComponentsUtilities";

export const DetachEngineAction = ({ driver }) => {

	const queryClient = useQueryClient();

	const detachAlert = 'detach-alert';

	const { mutate, isLoading } = useDetachEngineMutation();

	const detachEngine = () => {

		if (isLoading) {

			return
		}

		mutate({

			driverId : driver._id
		}, {

			onSuccess () {

				queryClient.invalidateQueries(['driverProfile', driver._id]);
			},

			onError () {

				toast({ message : 'une erreur s\'est produite.' });
			}
		});
	}

	return (

		<div>

			<div onClick={() => modalAction(detachAlert, 'open')} className="text-red-500 cursor-pointer">

				<Trash2/>

			</div>

			<ConfirmAlert

				modalId={detachAlert}
				text="êtes-vous sûr de vouloir détachez cet véhicule de ce chauffeur ?"
				onConfirm={detachEngine}
			/>

		</div>
	)
}

const DriverActions = ({ driver }) => {

	const queryClient = useQueryClient();

	const { isDriverActive, isDriverBlocked } = usePermissions();

	const blockAlertId = `${driver._id}-block-alert`;

	const unblockAlertId = `${driver._id}-unblock-alert`;

	const { mutate : mutateBlock, isLoading : isBlocking } = useBlockDriverMutation();

	const { mutate : mutateUnblock, isLoading : isUnblocking } = useUnblockDriverMutation();

	const blockDriver = () => {

		if (isBlocking || isUnblocking) {

			return
		}

		mutateBlock({

			driverId : driver._id
		}, {

			onSuccess () {

				queryClient.invalidateQueries('drivers');

				queryClient.invalidateQueries(['driverProfile', driver._id]);
			},

			onError () {

				toast({ message : 'une erreur s\'est produite.' });
			}
		});
	}

	const unblockDriver = () => {

		if (isBlocking || isUnblocking) {

			return
		}

		mutateUnblock({

			driverId : driver._id
		}, {

			onSuccess () {

				queryClient.invalidateQueries('drivers');

				queryClient.invalidateQueries(['driverProfile', driver._id]);
			},

			onError () {

				toast({ message : 'une erreur s\'est produite.' });
			}
		});
	}

	return (

		<div>

			<div className="dropdown dropdown-bottom dropdown-left">

				<label tabIndex={0} className="cursor-pointer">

					<MoreVertical size={20}/>

				</label>

				<ul tabIndex={0} className="dropdown-content menu p-2 shadow-md bg-base-100 rounded-box w-60">

					{ driver.engineId && (

						<li>

							<Link to={`/engines/details/${driver.engineId}`}>

								<span><ExternalLink size={18}/></span>

								<span className="first-letter:uppercase">voir le véhicule</span>

							</Link>

						</li>
					) }

					{ isDriverActive(driver) && (

						<li>

							<a onClick={() => modalAction(blockAlertId, 'open')}>

								<span><Lock size={18}/></span>

								<span className="first-letter:uppercase">bloquer</span>

							</a>

						</li>
					) }

					{ isDriverBlocked(driver) && (

						<li>

							<a onClick={() => modalAction(unblockAlertId, 'open')}>

								<span><Unlock size={18}/></span>

								<span className="first-letter:uppercase">débloquer</span>

							</a>

						</li>
					) }

				</ul>

			</div>

			<ConfirmAlert

				modalId={blockAlertId}
				text="êtes-vous sûr de vouloir bloquer ce chauffeur ?"
				onConfirm={blockDriver}
			/>

			<ConfirmAlert

				modalId={unblockAlertId}
				text="êtes-vous sûr de vouloir débloquer ce chauffeur ?"
				onConfirm={unblockDriver}
			/>

		</div>
	)
}

export default DriverActions;