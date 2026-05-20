import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  return (
    <div className="profile-card-container">
      <img src={profileImageUrl} alt="profile" className="profile-avatar" />
      <h1 className="profile-user-name">{name}</h1>
      <p className="profile-user-bio">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
