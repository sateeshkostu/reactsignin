import React, { useState, useEffect } from "react";

// import Todolist from './Todolist';
import axios from 'axios'

const Todo = () => {
    const [task, settask] = useState();
    const [Duration, setDuration] = useState("")
    const [Startdate, setStartdate] = useState("")
    const [Enddate, setEnddate] = useState("")
    const [todoList, setTodoList] = useState([])
    const [id, setId] = useState(null);
    const [newValue, setNewValue] = useState("");
    const [newduration, setnewduration] = useState("");
    const [newstartdate, setnewstartdate] = useState("");
    const [newenddate, setnewenddate] = useState("")
    const [isclicked, setisclicked] = useState(true)


    const useremail = localStorage.getItem('userEmail')  //get the useremail from localstorage key value userEmail

    const [todos, settodos] = useState([])          //add chese every value  list lo add avvadam
    // kosam oka list ni create chaili list name is todos//

    // localStorage.setItem('todos', JSON.stringify(todos));

    // useEffect(() => {

    //     if (email) {
    //         settodos(JSON.parse(email));
    //     }
    // }, []);
    // if (todos) {
    //     settodos(todos);
    // }
    const changehandler = e => {                  //changehandler is used to enter the value is work in
        // proper add to variable settask is assign to task //
        settask(e.target.value)                 //e.target.value is used to enter the value is task value is 
        //mention in input type text //
    }
    useEffect(() => {
        getdetails();
    }, [])
    const getdetails = () => {
        axios.get("https://sore-erin-gorilla-toga.cyclic.app/todos/gettodos").then(
            responce => {
                var filterdata = responce.data.todos.filter(data => {  //filterdata is used to filter the todos from data
                    return data.useremail == useremail  //data.useremail is used to return the data
                })
                setTodoList(filterdata);
                console.log(filterdata)
            }
        )
    }
    const submithandler = e => {             //form submit avvadam kosam oka array function declare chesekoni dani kosam 
        //submit handler ni declare chesam submit handler ni starting of form lo use chaile //
        e.preventDefault();
        const body = {
            useremail: useremail,
            name: task,
            Duration: Duration,
            Startdate: Startdate,
            Enddate: Enddate
        }
        axios.post('https://sore-erin-gorilla-toga.cyclic.app/todos/todos', body)
            .then((responce) => {
                console.log("list has been posted")
                getdetails()
                settask("")
                setDuration("")
                setStartdate("")
                setEnddate("")
            })

            .catch((error) => console.log(error));
    };
    const deletehandler = (id) => {
        alert("you want to delete")
        axios.delete('https://sore-erin-gorilla-toga.cyclic.app/todos/deletetodos/' + id)
            .then((response) => {
                const newtodos = todos.filter((list) => list.id !== id);
                setTodoList(newtodos);
                getdetails();
            })
            .catch((error) => console.log(error));
    }

    // const handleEdit = (id) => {
    //     axios.get('http://localhost:2000/todos/todos/' + id)
    //         .then(res => {
    //             settodos(res.data)

    //         })
    //         .catch(err => console.log(err))
    // };

    const updatehandler = (id) => {

        axios.put('https://sore-erin-gorilla-toga.cyclic.app/todos/updatetodos/' + id, { name: newValue, Duration: newduration, Startdate: newstartdate, Enddate: newenddate })
            .then(response => {
                const newtodos = todoList.map(list => {
                    if (list._id === id) {
                        return { ...list, name: newValue, Duration: newduration, Startdate: newstartdate, Enddate: newenddate };
                    }
                    return list;
                });
                setTodoList(newtodos);
                setId(null);
                setNewValue("");
                setnewduration("")
                setnewstartdate("")
                setnewenddate("")
                setisclicked(true)
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <center className="center1">
                <div className="cardtodo">
                    <div className="cardbody">
                        <h1 className="cardtitle" >Todo Management Application</h1> &nbsp;
                        {isclicked ? (
                            <form onSubmit={submithandler} style={{ textAlign: 'center', fontSize: '30px', color: 'white', fontStyle: 'italic' }}>
                                <div>
                                    <label><b>TaskName:</b></label>
                                    <input style={{ width: '200px', height: '30px', fontSize: '20px', borderRadius: '10px' }} type="text" name="task" value={task} onChange={changehandler} />
                                </div> &nbsp;
                                <div>
                                    <label><b>Duration:</b></label> &nbsp;
                                    <input style={{ width: '200px', height: '30px', fontSize: '20px', borderRadius: '10px' }} type="text" value={Duration} onChange={(e) => setDuration(e.target.value)} />
                                </div> &nbsp;
                                <div>
                                    <label><b>Startdate:</b></label> &nbsp;
                                    <input style={{ width: '200px', height: '30px', fontSize: '20px', borderRadius: '10px' }} type="date" value={Startdate} onChange={(e) => setStartdate(e.target.value)} />
                                </div> &nbsp;
                                <div>
                                    <label><b>Enddate:</b></label> &nbsp;
                                    <input style={{ width: '200px', height: '30px', fontSize: '20px', borderRadius: '10px' }} type="date" value={Enddate} onChange={(e) => setEnddate(e.target.value)} />
                                </div> &nbsp;
                                <div>
                                    <button style={{ borderRadius: '10px', padding:'5px',width:'200px', fontSize: '30px', textAlign:'center', backgroundColor: 'blue', color: 'white' }} type="submit" value="Add" name="Add" >ADD</button>
                                </div>
                                <h4 style={{ fontStyle: 'italic' }}>{useremail}</h4>
                                &nbsp;
                            </form>
                        ) : (<form style={{ fontSize: '20px' }} onSubmit={(e) => {
                            e.preventDefault();
                            updatehandler(id);
                        }}>
                            <div>
                                <label>TaskName:</label>
                                <input style={{ width: '200px', height: '30px', fontSize: '20px' }} type="text" name="newValue" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                            </div> &nbsp;
                            <div>
                                <label>Duration:</label> &nbsp;
                                <input style={{ width: '200px', height: '30px', fontSize: '20px' }} type="text" name="newduration" value={newduration} onChange={(e) => setnewduration(e.target.value)} />
                            </div>  &nbsp;
                            <div>
                                <label>Startdate:</label>  &nbsp;
                                <input style={{ width: '200px', height: '30px', fontSize: '20px' }} type="date" name="newstartdate" value={newstartdate} onChange={(e) => setnewstartdate(e.target.value)} />
                            </div>  &nbsp;
                            <div>
                                <label>Enddate:</label> &nbsp;
                                <input style={{ width: '200px', height: '30px', fontSize: '20px' }} type="date" name="newenddate" value={newenddate} onChange={(e) => setnewenddate(e.target.value)} />
                            </div>  &nbsp;

                            <div>
                                <button style={{ borderRadius: '10px', padding:'10px',width:'200px', fontSize: '30px', }} type="submit">Update</button>
                            </div>
                        </form>)}


                        {/* <div style={{ display: 'flex', flexDirection: "column" }}> */}
                        {/* <Todolist settodos={settodos} todolist={todolist} deletehandler={deletehandler} /> */}
                        {/* </div> */}

                    </div>
                </div>
                <div className="map">
                    {todoList.map(list => (<h4 className="cards" key={list.id} style={{ textAlign: 'center', color: 'white', width: '300px', height: '300px', fontSize: '20px' }}> &nbsp;
                        {/* <div>{list.useremail}</div> */}
                        <div>Taskname:&nbsp;{list.name}</div>
                        <div>Duration:&nbsp;{list.Duration}</div>
                        <div>Startdate:&nbsp;{list.Startdate}</div>
                        <div>Enddate:&nbsp;{list.Enddate}</div> &nbsp;
                        <div style={{ justifyContent: 'space-between' }}>
                            <button onClick={() => {
                                setId(list._id);
                                setNewValue(list.name);
                                setnewduration(list.Duration);
                                setnewstartdate(list.Startdate);
                                setnewenddate(list.Enddate)
                                setisclicked(false)
                            }} style={{ backgroundColor: 'dodgerblue', borderRadius: '10px', padding:'5px',width:'150px', fontSize: '30px', color: 'white' }}>Edit</button><br/><br/>
                            <button style={{ borderRadius: '10px', padding:'5px',width:'150px', fontSize: '30px', backgroundColor: 'red', color: 'white' }} onClick={() => deletehandler(list._id)}>Delete</button>&nbsp;
                        </div></h4>))}
                </div>
            </center>
        </>
    )

}

export default Todo;