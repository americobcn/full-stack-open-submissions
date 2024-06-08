import { useState } from 'react'

const Filter = (props) => {
  return (
    <>
    Filter by name: <input onChange={props.onFilterChange} />
    </>
  )
}

const PersonForm = (props) => {
  // console.log({...props})
  return (
      <form onSubmit={props.onSubmit}>
        <div>
          Name: <input value={props.name} onChange={props.onNameChange}/>
        </div>
        <div>
          Phone: <input value={props.phone} onChange={props.onPhoneChange}/>
          </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  // console.log("Persons", props)
  return (
    <ul>
        {props.filter 
        ? props.personsFiltered.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        : props.persons.map(person => <li key={person.name}>{person.name} {person.number}</li>) }
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('What\'s your name?')
  const [newPhone, setNewPhone] = useState('What\'s your phone number?')
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [filter, setFilter] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e);
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newPhone
    }
    
    if (persons.filter(person => person.name === newPerson.name).length > 0) {
      return alert(`${newName} already exists`)
    }

    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewPhone("")
  } 

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    // console.log(e.target.value);
    setNewPhone(e.target.value)
  }

  const handleFilterChange = (e) => {
    // console.log(e.target.value);
    if ((e.target.value).length === 0) {
      setFilter(false)
    } else {
      setFilter(true)
      setPersonsFiltered(persons.filter(person => person.name.toLowerCase().includes(e.target.value)))
      console.log(personsFiltered);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange}/>
     
      <h3>Add new contact</h3>
      <PersonForm name={newName} 
                  phone={newPhone} 
                  onSubmit={handleSubmit} 
                  onPhoneChange={handlePhoneChange}
                  onNameChange={handleNameChange}/> 
     
      <h3>Numbers</h3>
      <Persons filter={filter} 
              persons={persons} 
              personsFiltered={personsFiltered}/>
    </div>
  )
}

export default App