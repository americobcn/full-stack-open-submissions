const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log("Part:", props)
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  console.log("Content:", props)
  return (
    <>
      {
        props.parts.map((p, idx) => <Part part={p.name} exercise={p.exercises} key={idx} />)
      }
    </>
  )
}

const Total = (props) => {
  console.log("Total: ", props)
  return (
    <p> Number of exercises {
      props.total[0].exercises + props.total[1].exercises + props.total[2].exercises
    }
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  )
}

export default App