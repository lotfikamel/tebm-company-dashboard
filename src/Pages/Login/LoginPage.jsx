import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';

import useForms from '../../Hooks/useForms';

import useAuthStore from '../../Store/useAuthStore';

import { AlertDanger } from '../../Components/Alerts';

import Logo from '../../Assets/logo.png';

import { APP_NAME } from '../../Constants/Constants';

const LoginPage = () => {

	const navigate = useNavigate();

	const { sending, login } = useAuthStore();

	const { inputs, errors, handleInputTextChange, addErrors } = useForms({

		initInputs : {

			email : '',
			password : ''
		},

		errorMessages : {

			login : {

				notFound : 'Ce compte n\'existe pas.',
				error : 'Une erreur s\'est produite.'
			}
		}
	});

	const submit = (e) => {

		e.preventDefault();

		if (sending === false) {

			const data = {};

			for (let input in inputs) {

				data[input] = inputs[input].trim();
			}

			login(data).then(() => {

				navigate('/', { replace : true });
			}).catch(err => {

				addErrors(err);
			})
		}
	}

	return (

		<div id="login-page">

			<div className="container mx-auto px-4 lg:py-8 flex justify-center">

				<div className="lg:w-2/5 border border-stone-200 p-6 rounded-xl">

					<div>

						<img src={Logo} alt="" className="logo" width="200" />

					</div>

					<h1 className="first-letter:uppercase mb-8 font-bold">Bienvenue sur { APP_NAME } Entreprise</h1>

					<form onSubmit={submit} className="space-y-4">
					
						<div>

							<input

								type="text"
								name="email"
								value={inputs.email}
								onChange={handleInputTextChange}
								className="input input-bordered w-full"
								placeholder="Email"
								autoComplete="off"
							/>

						</div>

						<div>

							<input

								type="password"
								name="password" 
								value={inputs.password}
								onChange={handleInputTextChange}
								className="input input-bordered w-full"
								placeholder="Mot de passe"
							/>

						</div>

						<div className="text-right">

							<button type="submit" className={classNames("btn btn-primary", { 'loading' : sending })}>connexion</button>

						</div>

						{ errors.login && <AlertDanger message={errors.login}/> }

					</form>

				</div>

			</div>

		</div>
	)
}

export default LoginPage