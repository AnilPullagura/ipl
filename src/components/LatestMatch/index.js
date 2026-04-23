// Write your code here
import {Component} from 'react'

import './index.css'

class LatestMatch extends Component {
  render() {
    const {details} = this.props
    const updateData = {
      umpires: details.umpires,
      result: details.result,
      manofTheMatch: details.man_of_the_match,
      date: details.date,
      venue: details.venue,
      competingTeam: details.competing_team,
      competingImgUrl: details.competing_team_logo,
      firstInning: details.first_innings,
      secongInnings: details.second_innings,
    }

    return (
      <div className="latest-match-card">
        <div>
          <p className="team-head">{updateData.competingTeam}</p>
          <p>{updateData.date}</p>
          <p>{updateData.venue}</p>
          <p>{updateData.result}</p>
        </div>

        <img
          className="compete-logo"
          src={updateData.competingImgUrl}
          alt={`latest match ${updateData.competingTeam}`}
        />

        <div className="scores-card">
          <p>first Innings</p>
          <p>{updateData.firstInning}</p>
          <p>secong Innings</p>
          <p>{updateData.secongInnings}</p>
          <p>man ofThe Match</p>
          <p>{updateData.manofTheMatch}</p>
          <p>Umpires</p>
          <p>{updateData.umpires}</p>
        </div>
      </div>
    )
  }
}
export default LatestMatch
