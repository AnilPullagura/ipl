// Write your code here
import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  render() {
    const {eachItem} = this.props
    const updateData = {
      competImgUrl: eachItem.competing_team_logo,
      competingName: eachItem.competing_team,
      result: eachItem.result,
      matchStatus: eachItem.match_status,
    }
    const toogleClass = updateData.matchStatus === 'Won' ? 'won' : 'loss'
    return (
      <li className="recent-list-item">
        <div className="recent-matches">
          <img
            className="recent-match-img"
            src={updateData.competImgUrl}
            alt={`competing team ${updateData.competing_team}`}
          />
          <p>{updateData.competingName}</p>
          <p className="result">{updateData.result}</p>
          <p className={toogleClass}>{updateData.matchStatus}</p>
        </div>
      </li>
    )
  }
}
export default MatchCard
