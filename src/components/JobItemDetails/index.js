import Cookies from 'js-cookie'
import {Component} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import JobItemCompleteDetails from '../JobItemCompleteDetails'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

import './index.css'

const jobDetailsApiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    jobDetailsApi: jobDetailsApiConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({jobDetailsApi: jobDetailsApiConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const data = fetchedData.job_details

      const jobDetails = {
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        id: data.id,
        jobDescription: data.job_description,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        title: data.title,
      }

      const skillsDetails = data.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))

      const lifeAtCompanyData = data.life_at_company
      const lifeAtCompanyDetails = {
        description: lifeAtCompanyData.description,
        imageUrl: lifeAtCompanyData.image_url,
      }

      const similarJobsDetails = fetchedData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const formattedData = {
        jobDetails: {
          ...jobDetails,
          skills: skillsDetails,
          lifeAtCompany: lifeAtCompanyDetails,
        },
        similarJobs: similarJobsDetails,
      }

      this.setState({
        jobDetailsApi: jobDetailsApiConstants.success,
        jobItemDetails: formattedData,
      })
    } else {
      this.setState({jobDetailsApi: jobDetailsApiConstants.failure})
    }
  }

  renderJobItemView = () => {
    const {jobItemDetails, jobDetailsApi} = this.state

    switch (jobDetailsApi) {
      case jobDetailsApiConstants.success: {
        const {jobDetails, similarJobs} = jobItemDetails
        return (
          <div className="job-details-success-view">
            <JobItemCompleteDetails jobDetails={jobDetails} />
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-list">
              {similarJobs.map(eachItem => (
                <SimilarJobs key={eachItem.id} jobsData={eachItem} />
              ))}
            </ul>
          </div>
        )
      }
      case jobDetailsApiConstants.failure:
        return (
          <div className="failure-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="failure-image"
            />
            <h1 className="status-heading">Oops! Something Went Wrong</h1>
            <p className="status-description">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              type="button"
              className="retry-button"
              data-testid="retryButton"
              onClick={this.getJobDetails}
            >
              Retry
            </button>
          </div>
        )
      case jobDetailsApiConstants.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <ThreeDots color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-bg-container">
          {this.renderJobItemView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
