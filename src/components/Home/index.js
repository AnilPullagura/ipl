// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import TeamCard from '../TeamCard/index'

class Home extends Component {
  state = {teamList: [], isFinish: true}

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const newData = data.teams
    const updateData = newData.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teamList: updateData, isFinish: false})
  }

  render() {
    const {teamList, isFinish} = this.state

    return (
      <div className="back-container">
        <div className="head-box">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
            alt="ipl logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        {isFinish ? (
          <Loader
            testid="loader"
            type="Oval"
            height={50}
            width={50}
            color="#ffffff"
          />
        ) : (
          <ul className="ul-list">
            {teamList.map(each => (
              <TeamCard details={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
