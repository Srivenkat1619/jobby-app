import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import EmploymentCheckbox from '../EmploymentCheckbox'
import SalaryRadioButton from '../SalaryRadioButton'
import SearchInput from '../SearchInput'
import ProfileCard from '../ProfileCard'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileApiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jobApiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  noJobs: 'NOJOBS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileApiStatus: profileApiConstants.initial,
    profileDetails: {},
    checkedEmploymentTypes: [],
    selectedSalaryRange: '',
    searchInput: '',
    jobApiStatus: jobApiConstants.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobApiStatus: jobApiConstants.loading})
    const {searchInput, checkedEmploymentTypes, selectedSalaryRange} =
      this.state
    const employmentType = checkedEmploymentTypes.join()

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const formattedJobData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      if (formattedJobData.length === 0) {
        this.setState({jobApiStatus: jobApiConstants.noJobs})
      } else {
        this.setState({
          jobsList: formattedJobData,
          jobApiStatus: jobApiConstants.success,
        })
      }
    } else {
      this.setState({jobApiStatus: jobApiConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileApiConstants.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedProfileData = await response.json()

    if (response.ok === true) {
      const data = fetchedProfileData.profile_details
      const formattedData = {
        name: data.name,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        profileApiStatus: profileApiConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiConstants.failure})
    }
  }

  renderProfileDetails = () => {
    const {profileDetails, profileApiStatus} = this.state

    switch (profileApiStatus) {
      case profileApiConstants.success:
        return <ProfileCard profileDetails={profileDetails} />
      case profileApiConstants.loading:
        return this.renderLoader()
      case profileApiConstants.failure:
        return (
          <div className="profile-failure-container">
            <button
              type="button"
              className="retry-button"
              data-testid="retryButton"
              onClick={this.getProfileDetails}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots color="#ffffff" height="50" width="50" />
    </div>
  )

  renderEmploymentTypes = () => {
    const {checkedEmploymentTypes} = this.state
    return (
      <div className="filter-group-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filters-list">
          {employmentTypesList.map(eachItem => (
            <EmploymentCheckbox
              key={eachItem.employmentTypeId}
              employmentTypesDetails={eachItem}
              updateCheckedEmploymentTypes={this.updateCheckedEmploymentTypes}
              isChecked={checkedEmploymentTypes.includes(
                eachItem.employmentTypeId,
              )}
            />
          ))}
        </ul>
      </div>
    )
  }

  updateCheckedEmploymentTypes = employmentTypeId => {
    const {checkedEmploymentTypes} = this.state
    const isChecked = checkedEmploymentTypes.includes(employmentTypeId)

    if (isChecked) {
      const newEmploymentTypes = checkedEmploymentTypes.filter(
        eachItem => eachItem !== employmentTypeId,
      )
      this.setState({checkedEmploymentTypes: newEmploymentTypes}, this.getJobs)
    } else {
      const newEmploymentTypes = [...checkedEmploymentTypes, employmentTypeId]
      this.setState({checkedEmploymentTypes: newEmploymentTypes}, this.getJobs)
    }
  }

  renderSalaryRange = () => {
    const {selectedSalaryRange} = this.state
    return (
      <div className="filter-group-container">
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filters-list">
          {salaryRangesList.map(eachItem => (
            <SalaryRadioButton
              key={eachItem.salaryRangeId}
              salaryRangeDetails={eachItem}
              updateSalaryRangeId={this.updateSalaryRangeId}
              isChecked={selectedSalaryRange === eachItem.salaryRangeId}
            />
          ))}
        </ul>
      </div>
    )
  }

  updateSalaryRangeId = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId}, this.getJobs)
  }

  updateSearchInput = searchInput => {
    this.setState({searchInput})
  }

  searchIconClicked = () => {
    this.getJobs()
  }

  renderSearchAndJobs = () => {
  const {searchInput} = this.state
  return (
    <div className="jobs-data-container">
      <SearchInput
        searchInput={searchInput}
        updateSearchInput={this.updateSearchInput}
        searchIconClicked={this.searchIconClicked}
      />
      {this.renderJobsView()}
    </div>
  )
}

  renderJobsView = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case jobApiConstants.success:
        return this.renderJobs()
      case jobApiConstants.loading:
        return this.renderLoader()
      case jobApiConstants.noJobs:
        return this.renderNoJobs()
      case jobApiConstants.failure:
        return this.renderJobApiFailure()
      default:
        return null
    }
  }

  renderNoJobs = () => (
    <div className="status-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="status-image"
      />
      <h1 className="status-heading">No Jobs Found</h1>
      <p className="status-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobApiFailure = () => (
    <div className="status-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="status-image"
      />
      <h1 className="status-heading">Oops! Something Went Wrong</h1>
      <p className="status-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        data-testid="retryButton"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state

    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobItem key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="jobs-layout-container">
            <div className="sidebar-container">
              {this.renderProfileDetails()}
              <hr className="divider-line" />
              {this.renderEmploymentTypes()}
              <hr className="divider-line" />
              {this.renderSalaryRange()}
            </div>
            {this.renderSearchAndJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
