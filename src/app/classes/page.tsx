import { classes } from '@/lib/data/classes'

const ClassesPage = () => {
  return (
    <div className="p-4">
      {Object.keys(classes).map((key) => {
        const cls = classes[key]
        return (
          <div key={key} className="border rounded p-2 mb-4">
            <h2 className="text-xl font-bold">{cls.name}</h2>
            <h3 className="font-medium mt-2">Skills:</h3>
            <ul>
              {cls.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default ClassesPage
