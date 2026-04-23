// Write your code here
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
