import { useState, useEffect } from 'react'
import personsService from "./services/persons"

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  } else if (errorMessage) {
    return (
      <div className="failed">
        {errorMessage}
      </div>
    )
  } else {
    return null
  }
  
}

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
  console.log("Persons", props)

  return (
    <ul>
        {
          props.filter 
          ? props.personsFiltered.map(person => <li key={person.id}>{person.name} {person.number}
            <button onClick={() => props.onDeletePerson(person.id)}>Delete</button>
            </li>)
          : props.persons.map(person => <li key={person.id}>{person.name} {person.number}
            <button onClick={() => props.onDeletePerson(person.id)}>Delete</button>
            </li>)
        }
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('What\'s your name?')
  const [newPhone, setNewPhone] = useState('What\'s your phone number?')
  const [personsFiltered, setPersonsFiltered] = useState(persons)
  const [filter, setFilter] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    console.log("Effect");
    personsService
    .getAllPersons()
    .then(personsList => {
      console.log("Response fullfilled: ", personsList)
      setPersons(personsList)
    })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e);
    const newPerson = {
      name: newName,
      number: newPhone
    }

    const existingPerson = persons.find(person => person.name === newPerson.name)
    
    if (existingPerson) {
      if (window.confirm(`Update number of ${existingPerson.name}.`)) {
        personsService
          .updatePersonNumber(newPerson, existingPerson.id)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setSuccessMessage(`Succesfully updated ${returnedPerson.name}`)
            setTimeout(() => setSuccessMessage(null), 2500)
          })
          .catch(error => setErrorMessage(`Information about ${existingPerson.name} 
            has already been removed from server`))
          setTimeout(() => setErrorMessage(null), 2500)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        } else {
        return
      }
    } else {
      personsService
        .createPerson(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        setSuccessMessage(`Succesfully added ${newPerson.name}`)
        setTimeout(() => setSuccessMessage(null), 2500)
    }
  
    setNewName("")
    setNewPhone("")
  }

  const handleDeletePerson = id => {
    const personToDelete = persons.filter(person => person.id === id)
    console.log("To be deleted: ", personToDelete[0])
    if (window.confirm(`Delete person named ${personToDelete[0].name}.`)) {
      personsService
        .deletePerson(id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter(p => p.id !== returnedPerson.id))
          setSuccessMessage(`Succesfully deleted ${returnedPerson.name}`)
          setTimeout(() => setSuccessMessage(null), 2500)
        })
    }
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
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
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
              personsFiltered={personsFiltered}
              onDeletePerson={handleDeletePerson}
              />
              
    </div>
  )
}

export default App