// Write your code here
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class TeamCard extends Component {
  render() {
    const {details} = this.props
    const {name, id, teamImageUrl} = details

    return (
      <Link className="link" to={`/team-matches/${id}`}>
        <li>
          <div className="list-container">
            <img className="team-img" src={teamImageUrl} alt={name} />
            <p className="team-name">{name}</p>
          </div>
        </li>
      </Link>
    )
  }
}

export default TeamCard
