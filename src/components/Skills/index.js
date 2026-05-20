import './index.css'

const Skills = props => {
  const {skill} = props
  const {imageUrl, name} = skill

  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
