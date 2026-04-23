// Write your code here
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import './index.css'

class TeamMatches extends Component {
  state = {
    matchList: {
      teamBannerUrl: '',
      latestMatchDetails: {},
      recentMatch: [],
    },
    isFinish: true,
  }

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const latestMatches = await response.json()

    const updateData = {
      teamBannerUrl: latestMatches.team_banner_url,
      latestMatchDetails: latestMatches.latest_match_details,
      recentMatch: latestMatches.recent_matches,
    }

    this.setState({
      matchList: {
        teamBannerUrl: updateData.teamBannerUrl,
        latestMatchDetails: updateData.latestMatchDetails,
        recentMatch: updateData.recentMatch,
      },
      isFinish: false,
    })
  }

  render() {
    const {matchList, isFinish} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatch} = matchList
    const competingTeam = latestMatchDetails.competing_team
    const stats = {
      won: 0,
      lost: 0,
      draw: 0,
    }

    recentMatch.forEach(each => {
      switch (each.match_status) {
        case 'Won':
          stats.won += 1
          break
        case 'Lost':
          stats.lost += 1
          break
        case 'Draw':
          stats.draw += 1
          break
        default:
          break
      }
    })
    const statsData = [
      {name: 'Won', value: stats.won},
      {name: 'Lost', value: stats.lost},
      {name: 'Draw', value: stats.draw},
    ]
    return (
      <div className="matches-container">
        <Link className="arrow-icon" to="/">
          <i className="fa-solid fa-arrow-left arrow" />
        </Link>
        {isFinish ? (
          <Loader
            testid="loader"
            type="Oval"
            height={50}
            width={50}
            color="#ffffff"
          />
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt={`competing team ${competingTeam}`}
              className="banner-img"
            />
            <div className="latest-score">
              <p>Latest Match</p>
              <LatestMatch details={latestMatchDetails} />
            </div>
            <PieChart width={300} height={300}>
              <Pie
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                data={statsData}
                dataKey="value"
              >
                <Cell name="Won" fill="#2d6a4f" />
                <Cell name="Lost" fill="#ae2012" />
                <Cell name="Draw" fill="#a3a3a3" />
              </Pie>
              <Tooltip />
              <Legend height={36} />
            </PieChart>

            <ul className="recent-ul-list">
              {recentMatch.map(each => (
                <MatchCard eachItem={each} key={each.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
