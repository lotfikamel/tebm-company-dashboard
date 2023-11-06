import BackNavbar from '../../Components/BackNavbar';

import notFoundIllustration from '../../Assets/Illustrations/not-found.svg';

import { APP_NAME } from '../../Constants/Constants';

const NotFoundPage = () => {

	return (

		<div id="notfound-page">

			<div className="container mx-auto px-4">

				<BackNavbar/>

				<div className="text-center">

					<h1 className="font-bold first-letter:uppercase">page introuvable</h1>

					<div className="flex justify-center">

						<img src={notFoundIllustration} alt="404 page introuvable" className="w-1/3"/>

					</div>

					<p className="first-letter:uppercase text-2xl">la page que vous cherchez n'existe pas sur <strong>{ APP_NAME }</strong>.</p>

				</div>
				
			</div>
			
		</div>
	)	
}

export default NotFoundPage;