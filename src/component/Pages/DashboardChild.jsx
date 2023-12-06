import React, { useRef, useState } from 'react';
import { Dropdown, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import { FaEllipsisH } from "react-icons/fa";
import Swal from 'sweetalert2';
const DashboardChild = () => {
    const [freeBusy, setFreeBusy] = useState('free');
    const [searchUsers, setSearchUsers] = useState([]);
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["instructorData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/users");
            const data = await res.json();
            //console.log(data);
            setSearchUsers(data);
            return data;
        },
    });

    const freeButton = (id, update) => {
        const req = {auth:{ is_authourize: true },
        data:{
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            id: id,
            status: update,
        }};
        fetch(`http://localhost:5000/users`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You want to switch!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes sure"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                         icon: "success"
                      });
                    
                    }
                    refetch()
                  });
                // refetch()
            })
            
    };
    const searchRef = useRef(null);
    const onSearchRef = () => {
        //searchRef.current.value
    }

    const filterBy = (input) => {
        //return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
       setSearchUsers([]);
       let list = users?.filter(item => item.username.toLowerCase().indexOf(input.toLowerCase()) !== -1 );
       if(input){
        setSearchUsers(list);
       //console.log(searchUsers,input,'u');
       }else{
        setSearchUsers(users);
        //console.log(searchUsers,input,'l');
       }
    };

    return (
        <div>
            <Tabs
                activeKey={freeBusy}
                onSelect={(selectedKey) => setFreeBusy(selectedKey)}
                id="uncontrolled-tab-example"
                className="mb-3 nav-justified"
            >
                <Tab eventKey="All" title="All" />
                <Tab eventKey="free" title="Free" />
                <Tab eventKey="busy" title="Busy" />
            </Tabs>

            {freeBusy === 'All' && (
                <div>
                    <input type="text" onChange={(e) => filterBy(e.target.value)} className="form-control" placeholder="type name for searching"></input>
                 {
                        searchUsers.map((item) =>
                        <div key={item._id} className="mt-2 d-flex justify-content-between align-items-center p-2 gap-2" style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}>
                            <div className="d-flex gap-3 align-items-center">
                                {
                                    item.status === 'free' ?

                                        <div className=" position-relative">

                                            <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                                onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                            <span className="position-absolute bottom-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span></div>
                                        : <div className=" position-relative">
                                            <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                                onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                            <span  className="position-absolute bottom-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        </div>
                                }

                                <div>
                                    <small className="text-primary">{item.username}</small>
                                    <div className="d-flex gap-2">
                                        <small>{item.mobile}</small>
                                        
                                    </div>
                                   
                                    {/* <small>{item.Address}</small>  */}


                                </div>
                            </div>

                            <div >
                                
                                <Dropdown>
                                    <Dropdown.Toggle className='w-100 btn-light' id="dropdown-basic">
                                        <FaEllipsisH />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='dropdown-menu'>
                                       
                                        <Dropdown.Item href="#">
                                            <small className=' justify-content-center align-items-center'>{item.time}</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <small className=' justify-content-center align-items-center'> {item.email}</small>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                       
                                        <Dropdown.Item href="#">
                                            <i className="fas fa-user-alt pe-2"></i>{ item.status === 'busy' ? <button style={{ border: 'none' }} type="button" className="btn text-success"  onClick={()=>freeButton(item._id,'free')}>Free</button> : <button style={{ border: 'none' }} type="button" className="btn text-danger " onClick={()=>freeButton(item._id,'busy')}>Busy</button>}
                                        </Dropdown.Item>


                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>


                        </div>
                    )
                 }   
                </div>
            )}
            {freeBusy !== 'All' && (
                users?.filter(item => item.status === freeBusy).map((item) =>
                    <div key={item._id} className="mt-2 d-flex justify-content-between align-items-center p-2 gap-2" style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}>




                        <div className="d-flex gap-3 align-items-center">

                            {
                                item.status === 'free' ?

                                    <div className=" position-relative">

                                        <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                            onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                        <span className="position-absolute bottom-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                            <span className="visually-hidden">New alerts</span>
                                        </span></div>
                                    : <div className=" position-relative">
                                        <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                            onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                        <span className="position-absolute bottom-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                            <span className="visually-hidden">New alerts</span>
                                        </span>
                                    </div>
                            }
                            <div>
                                <small className="text-primary">{item.username}</small>
                                <div className="d-flex gap-2">
                                    <small>{item.mobile}</small>
                                   
                                </div>

                               
                                <small>{item.date}</small>


                            </div>
                        </div>




                        <div >
                           
                            <Dropdown>
                                    <Dropdown.Toggle className='w-100 btn-light' id="dropdown-basic">
                                        <FaEllipsisH />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='dropdown-menu'>
                                       
                                        <Dropdown.Item href="#">
                                            <small className=' justify-content-center align-items-center'>{item.time}</small>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#">
                                            <small className=' justify-content-center align-items-center'> {item.email}</small>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                       
                                        <Dropdown.Item href="#">
                                            <i className="fas fa-user-alt pe-2"></i>{ item.status === 'busy' ? <button style={{ border: 'none' }} type="button" className="btn text-success"  onClick={()=>freeButton(item._id,'free')}>Free</button> : <button style={{ border: 'none' }} type="button" className="btn text-danger " onClick={()=>freeButton(item._id,'busy')}>Busy</button>}
                                        </Dropdown.Item>


                                    </Dropdown.Menu>
                                </Dropdown>
                        </div>


                    </div>

                )
            )}
            {/* <ToastContainer /> */}

        </div>
    );
};

export default DashboardChild;





