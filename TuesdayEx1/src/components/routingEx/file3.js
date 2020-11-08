import React from 'react';


const persons = [
  { firstName: "Kurt", lastName: "Wonnegut", gender: "Male", email: "k@wonnegut.dk", phone: "12345" },
  { firstName: "Jane", lastName: "Wonnegut", gender: "female", email: "j@wonnegut.dk", phone: "12345" },
  { firstName: "ib", lastName: "Wonnegut", gender: "Male", email: "i@wonnegut.dk", phone: "12345" },
];

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function WelcomePerson(props) {
  return <h4>Hi, {props.person.firstName}, {props.person.lastName}, {props.person.email}</h4>

}


function MultiWelcome() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edith" />
      <WelcomePerson person={persons[0]} />
      <WelcomePerson person={persons[1]} />
      <WelcomePerson person={persons[2]} />
      {persons.map((p) => <WelcomePerson person={p} />)}
    </div>
  );
};

export default MultiWelcome;

