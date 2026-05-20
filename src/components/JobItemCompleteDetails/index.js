import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {GrShare} from 'react-icons/gr'
import Skills from '../Skills'

import './index.css'

const JobItemCompleteDetails = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    lifeAtCompany,
    skills,
  } = jobDetails

  return (
    <div className="job-details-card">
      <div className="brand-header-section">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="brand-logo-img"
        />
        <div className="meta-info-block">
          <h1 className="main-job-title">{title}</h1>
          <div className="score-badge">
            <AiFillStar className="rating-star-icon" />
            <p className="score-value">{rating}</p>
          </div>
        </div>
      </div>

      <div className="sub-details-bar">
        <div className="geo-type-box">
          <div className="place-wrapper">
            <MdLocationOn className="pin-icon" />
            <p className="place-name">{location}</p>
          </div>
          <div className="job-type-wrapper">
            <BsFillBriefcaseFill className="bag-icon" />
            <p className="type-name">{employmentType}</p>
          </div>
        </div>
        <p className="salary-text">{packagePerAnnum}</p>
      </div>

      <hr className="horizontal-divider" />

      <div className="info-body-section">
        <div className="desc-header-row">
          <h1 className="section-sub-title">Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="site-link"
          >
            Visit <GrShare />
          </a>
        </div>
        <p className="main-body-text">{jobDescription}</p>
      </div>

      <h1 className="section-sub-title">Skills</h1>
      <ul className="tech-skills-list">
        {skills.map(eachItem => (
          <Skills key={eachItem.name} skill={eachItem} />
        ))}
      </ul>

      <h1 className="section-sub-title">Life at Company</h1>
      <div className="company-culture-panel">
        <p className="culture-desc">{lifeAtCompany.description}</p>
        <img
          src={lifeAtCompany.imageUrl}
          alt="life at company"
          className="culture-img"
        />
      </div>
    </div>
  )
}

export default JobItemCompleteDetails
