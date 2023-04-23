const url = "https://randomuser.me/api/"
import "./index.css"
import { FaCalendar, FaCalendarDay, FaEnvelopeOpen, FaLock, FaMap, FaPhone, FaUser } from 'react-icons/fa'

import React, { useEffect, useState } from 'react'
const defaultImg = "https://randomuser.me/api/portraits/men/52.jpg"

export const App = () => {
    const [person, setPerson] = useState({})
    const [title, setTitle] = useState("name")
    const [value, setValue] = useState("Person")
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        const req = await fetch(url)
        const data = await req.json()
        const result = data.results[0]

        const { large } = result.picture
        const { email, phone } = result
        const { first, last } = result.name
        const { age } = result.dob
        const { street: { number, name } } = result.location
        const { password } = result.login

        const newPerson = {
            large,
            email,
            phone,
            name: `${first}, ${last}`,
            age,
            street: `${number}, ${name}`,
            password
        }

        setPerson(newPerson)
        setTitle("name")
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    const handleValue = (e) => {
        if (e.target.classList.contains("icon")) {
            const nowTitle = e.target.dataset.list
            setTitle(nowTitle);
            setValue(person[nowTitle])

            
        }
    }

    return (
        <main>
            <div className="block bgc-black"></div>
            <div className="block">
                <div className="container">
                    <img src={(person && person.large) || defaultImg} alt="" />
                    <p className="user-title">My {title} is</p>
                    <p className="user-value">{value}</p>
                    <div className="values-list">
                        <button
                            className="icon"
                            onMouseOver={handleValue}
                            data-list="name"
                        >
                            <FaUser />
                        </button>
                        <button
                            className="icon"
                            onMouseOver={handleValue}
                            data-list="email"
                        >
                            <FaEnvelopeOpen />
                        </button>
                        <button
                            className="icon"
                            onMouseOver={handleValue}
                            data-list="age"
                        >
                            <FaCalendarDay />
                        </button>
                        <button
                            className="icon"
                            onMouseOver={handleValue}
                            data-list="street"
                        >
                            <FaMap />
                        </button>
                        <button
                            className="icon"
                            onMouseOver={handleValue}
                            data-list="phone"
                        >
                            <FaPhone />
                        </button>
                        <button
                            className="icon"
                            onMouseOver={handleValue}
                            data-list="password"
                        >
                            <FaLock />
                        </button>
                    </div>
                        <button className="btn" type="button" onClick={getData}> {loading ? "Loading..."  : "Random user"} </button>
                </div>
            </div>
        </main>
    )
}

