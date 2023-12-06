import React, { useState } from 'react';
import { Dropdown, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleRight, FaEllipsisH } from "react-icons/fa";
import '../Pages/Dashboard.css'
const Dashboard3 = () => {
    const [freeBusy, setFreeBusy] = useState('free');
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["instructorData"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/users");
            const data = await res.json();
            console.log(data);
            return data;
        },
    });

    const freeButton = (id, update) => {
        const information = {
            timeStatus: new Date().toLocaleTimeString(),
            dateStatus: new Date().toLocaleDateString(),
            id: id,
            timeManagment: update,
        };
        fetch(`http://localhost:5000/users`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(information)
        })
            .then(res => res.json())
            .then(data => {
                toast.info('switch', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                refetch()
            })
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
                users.map((item) =>
                    <div key={item._id} className="mt-2 d-flex justify-content-between align-items-center p-2 gap-2" style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}>

                        <div className="d-flex gap-3 align-items-center">
                            {
                                item.timeManagment === 'free' ?

                                    <div class=" position-relative">

                                        <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                            onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                        <span class="position-absolute bottom-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                            <span class="visually-hidden">New alerts</span>
                                        </span></div>
                                    : <div class=" position-relative">
                                        <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                            onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                        <span class="position-absolute bottom-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                            <span class="visually-hidden">New alerts</span>
                                        </span>
                                    </div>
                            }

                            <div>
                                <small className="text-primary">{item.username}</small>
                                <div className="d-flex gap-2">
                                    <small>{item.mobile},</small>
                                    <small>{item.email}</small>
                                </div>

                                <small>{item.Address}</small> <br />

                                {/* <div className="d-flex gap-2">
                                    {item.timeManagment === 'free'? <p className="text-success">Free</p> : <p className="text-danger">Busy</p>}
                                
                                </div> */}
                            </div>
                        </div>
                        {/* <div className="me-3" >
                            <div className="text-primary mb-2" onClick={() => freeButton(item._id, 'free')}>Free </div>
                            <div className="text-primary" onClick={() => freeButton(item._id, 'busy')}>Busy</div>
                             <small>{item.timeStatus}</small>
                        </div> */}



                        {/* <div class="btn-group">
                            <button  type="button" class="btn btn-primary  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FaAngleRight />
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Separated link</a>
                            </div>
                            </div> */}

                        {/* <div class="btn-group-vertical " role="group" aria-label="Vertical button group">
                            <button type="button" class="btn btn-outline-primary btn-sm" disabled>{item.timeStatus}</button>

                            {item.timeManagment === 'free' ? <button type="button" class="btn btn-info btn-sm" disabled>Free</button> : <button type="button" class="btn btn-info btn-sm" disabled>Busy</button>}

                            {
                                item.timeManagment === 'free' ? <button onClick={() => freeButton(item._id, 'free')} type="button" class="btn btn-primary btn-sm">Free</button> :
                                    <button onClick={() => freeButton(item._id, 'busy')} type="button" class="btn btn-primary btn-sm">Busy</button>
                            }

                        </div> */}
                        <div >
                            <small>{item.timeStatus}</small>
                            <Dropdown>
                                <Dropdown.Toggle className='w-100 btn-light' id="dropdown-basic">
                                    <FaEllipsisH />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='dropdown-menu'>
                                    <Dropdown.Item href="#">
                                        <i className="fas fa-user-alt pe-2"></i> {item.timeManagment === 'free' ? <button style={{ border: 'none' }} type="button" class="btn text-danger  btn-sm" disabled>Busy</button> : <button style={{ border: 'none' }} type="button" class="btn text-success  btn-sm" disabled>Free</button>}
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item href="#">
                                        <i class="fa-solid fa-repeat"></i>{item.timeManagment === 'free' ? <button style={{ border: 'none' }} onClick={() => freeButton(item._id, 'free')} type="button" class="btn  btn-sm">Free</button> :
                                            <button style={{ border: 'none' }} onClick={() => freeButton(item._id, 'busy')} type="button" class="btn  btn-sm">Busy</button>}
                                    </Dropdown.Item> */}

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>


                    </div>
                )
            )}

            {freeBusy !== 'All' && (
                users.filter(item => item.timeManagment === freeBusy).map((item) =>
                    <div key={item._id} className="mt-2 d-flex justify-content-between align-items-center p-2 gap-2" style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}>




                        <div className="d-flex gap-3 align-items-center">
                            {/* <img src={item.useUrl} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt="" /> */}
                            {
                                item.timeManagment === 'free' ?

                                    <div class=" position-relative">

                                        <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                            onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                        <span class="position-absolute bottom-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
                                            <span class="visually-hidden">New alerts</span>
                                        </span></div>
                                    : <div class=" position-relative">
                                        <img src={item.useUrl} style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                                            onError={(e) => { e.currentTarget.src = "https://lifewhois.com/assets/imgs/no_photo.png" }} />
                                        <span class="position-absolute bottom-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                            <span class="visually-hidden">New alerts</span>
                                        </span>
                                    </div>
                            }
                            <div>
                                <small className="text-primary">{item.username}</small>
                                <div className="d-flex gap-2">
                                    <small>{item.mobile},</small>
                                    <small>{item.email}</small>
                                </div>

                                <small>{item.Address}</small> <br />
                                <small>{item.dateStatus}</small>

                                {/* <div className="d-flex gap-2">
                                    {item.timeManagment === 'free'? <p className="text-success">Free</p> : <p className="text-danger">Busy</p>}
                                
                                </div> */}
                            </div>
                        </div>


                        {/* <div class="btn-group-vertical " role="group" aria-label="Vertical button group">
                            <button type="button" class="btn btn-outline-primary btn-sm" disabled>{item.timeStatus}</button>

                            {item.timeManagment === 'free' ? <button type="button" class="btn btn-info btn-sm" disabled>Free</button> : <button type="button" class="btn btn-info btn-sm" disabled>Busy</button>}

                            {
                                item.timeManagment === 'free' ? <button onClick={() => freeButton(item._id, 'free')} type="button" class="btn btn-primary btn-sm">Free</button> :
                                    <button onClick={() => freeButton(item._id, 'busy')} type="button" class="btn btn-primary btn-sm">Busy</button>
                            }

                        </div> */}

                        <div >
                            <small>{item.timeStatus}</small>
                            <Dropdown>
                                <Dropdown.Toggle className='w-100' id="dropdown-basic">
                                    <FaEllipsisH />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='dropdown-menu'>
                                    <Dropdown.Item href="#">
                                        <i className="fas fa-user-alt pe-2"></i> {item.timeManagment === 'free' ? <button style={{ border: 'none' }} type="button" class="btn text-danger  btn-sm" disabled>Busy</button> : <button style={{ border: 'none' }} type="button" class="btn text-success  btn-sm" disabled>Free</button>}
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item href="#">
                                        <i class="fa-solid fa-repeat"></i>{item.timeManagment === 'free' ? <button style={{ border: 'none' }} onClick={() => freeButton(item._id, 'free')} type="button" class="btn  btn-sm">Free</button> :
                                            <button style={{ border: 'none' }} onClick={() => freeButton(item._id, 'busy')} type="button" class="btn  btn-sm">Busy</button>}
                                    </Dropdown.Item> */}

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>


                    </div>

                )
            )}
            <ToastContainer />

        </div>
    );
};

export default Dashboard3;



{/* <button type="button" class="btn btn-outline-primary">Button</button>
<button type="button" class="btn btn-info">Button</button>
<button type="button" class="btn btn-primary">Button</button> */}

