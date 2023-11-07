import { useTransportRidesStatsQuery } from "../../Queries/TransportRidesQueries"

const Stat = ({ title, stat }) => {

	return (

		<div className="stats shadow">

			<div className="stat">

				<div className="stat-title">{ title }</div>

				<div className="stat-value">{ stat }</div>

			</div>

		</div>
	)
}

const TransportRidesStats = () => {

	const { data : stats, isLoading, isError } = useTransportRidesStatsQuery();

	if (isLoading || isError) {

		return null
	}

	return (

		<div className="grid gap-4 grid-cols-4">

			<Stat title="Courses terminées" stat={stats.all}/>

			<Stat title="Courses terminées aujourd'hui" stat={stats.today}/>

			<Stat title="Courses terminées ce mois-ci" stat={stats.thisMonth}/>

			<Stat title="Courses terminées cette année" stat={stats.thisYear}/>

		</div>
	)
}

export default TransportRidesStats