import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobsData

  return (
    <li className="similar-job-item-container">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="brand-logo-img"
        />
        <div className="title-rating-container">
          <h1 className="title-heading">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </div>
      <div className="location-employment-container">
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p className="location-text">{location}</p>
        </div>
        <div className="employment-type-container">
          <BsFillBriefcaseFill className="briefcase-icon" />
          <p className="employment-type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
